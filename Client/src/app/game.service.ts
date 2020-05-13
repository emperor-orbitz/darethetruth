import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore'
import { AuthService } from "./auth.service"
import {GameStoreService} from "./game-store.service"
import * as firebase from 'firebase/app'
import { first } from 'rxjs/operators';



@Injectable({
  providedIn: 'root'
})

export class GameService {

  user: firebase.User;
  user_data: any;
  subscribed_game: any;
  game:any

  constructor(private afs: AngularFirestore, private authService: AuthService, private gs: GameStoreService) {
    //get user
    this.authService.loggedInStatus.then(user => { this.user = user })
    this.authService.user_data().then(user_data =>{ this.user_data = user_data})
    this.gameShot().then(game =>{ this.game = game})
    this.subscribeToGame()

  }


  async subscribeToGame(user_data? ) {
    console.log("my user data", user_data)
    let user = user_data!= undefined ? user_data : await this.authService.user_data()
    if(user.active_game == null){
      console.log("active gama was null", user.active_game)
      this.gs.addGame([])

    }
    else
     this.afs.doc(`games/${user.active_game}`).valueChanges()
      .subscribe(
        {
        next:(nxtFn: any) => {
        if(nxtFn) this.gs.addGame([nxtFn])
        else this.gs.addGame([])
        }
      })

  }


 


  async createGame(){
    let code = this.generateUID()
    //const uuid = this.getUserId()
    let user_data = await this.authService.user_data()
    console.log(user_data, "user hasssss")
    var doc = await this.afs.collection("games").add({ game_master: user_data.uid, game_member_count: 1, members: [{ ...user_data }], refer_code: code }) //add game and get ID
    var path = this.afs.doc(doc.path).ref.id;

    await this.afs.doc("games-ref/" + path).set({ game_code: code, game_id: path }) //add game to game-link COLLECTION
    await this.afs.doc(`users/${user_data.uid}`).set({ active_game: path }, { merge: true })
  
      //shadow and subscribe initialize again
    this.subscribeToGame(Object.assign({}, user_data, {active_game:path}))
  
  }



 async joinGame(id){
    let user_data = await this.authService.user_data()
    
    var fieldvalue = firebase.firestore.FieldValue;
    var fbs = firebase.firestore();
    //add to array
    let docs = await this.afs.collection('games-ref', ref => ref.where('game_code', '==', id)).get().toPromise()    
    
    docs.docs.forEach(doc =>{
      let { game_id } = doc.data()
      user_data = Object.assign({}, user_data, {active_game: game_id})
      console.log(doc.data())
      fbs.collection("games").doc(game_id).update({ "members": fieldvalue.arrayUnion({ ...user_data }) })
      this.afs.doc(`users/${user_data.uid}`).set({ active_game: game_id }, { merge: true })
      this.subscribeToGame()
    })
    

  }

 
  async gameShot(){
    let user_data = await this.authService.user_data()
    return this.afs.doc(`games/${user_data.active_game}`).get().pipe(first()).toPromise()
        .then(doc=>{
          return doc.data()
        })

  }


  private generateUID() {
    // I generate the UID from two parts here 
    // to ensure the random number provide enough bits.
    var firstPart: any = (Math.random() * 46656) | 0;
    var secondPart: any = (Math.random() * 46656) | 0;
    firstPart = ("000" + firstPart.toString(36)).slice(-3);
    secondPart = ("000" + secondPart.toString(36)).slice(-3);
    return firstPart + secondPart;
  }
  
}