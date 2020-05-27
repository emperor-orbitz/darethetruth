import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore'
import { AuthService } from "./auth.service"
import {GameStoreService} from "./game-store.service"
import * as firebase from 'firebase/app'
import {UserStoreService} from "./user-store.service"
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})

export class GameService {

  user: firebase.User;
  user_data: any;
  subscribed_game: any;
  game:any

  constructor( private route:Router, private userStore:UserStoreService, private afs: AngularFirestore, private authService: AuthService, private gs: GameStoreService) {
    
    this.subscribeToGame()

  }


   subscribeToGame(user_data? ) {
    //console.log("my user data", user_data)
    
    this.authService.user_data$().then(
      observable_data=>{
        if(observable_data == null){ return; } //he is not online
        else{
          observable_data.subscribe(
            {
              next:(user:any)=>{
                if(user.active_game == null){
                  this.userStore.addUser(user) //add user to obs
                  this.gs.addGame([]) //add game to obs
                }
                else{
                  this.afs.doc(`games/${user.active_game}`).valueChanges()
                  .subscribe(
                    {
                    next:(nxtFn: any) => {
                   
                    if(nxtFn && nxtFn.quests == null ) {
                      this.userStore.addUser(user) //add user to obs
                      this.gs.addGame([nxtFn])
                    }
                    else if(nxtFn && nxtFn.quests != null){
                      this.userStore.addUser(user) //add user to obs

                      nxtFn.quests.reverse()  //add reversed game
                        this.gs.addGame([nxtFn])
                    }
                    
                    else this.gs.addGame([])
            
            
                    }
                  })


                }
              }
            }
          )
        }
       



      }
    )
    
  

  }


 


  async createGame(){
    let code = this.generateUID()
    //const uuid = this.getUserId()
    let user_data = this.userStore.user_data()
    //console.log(user_data, "daaaatttaughggg")


    var doc = await this.afs.collection("games").add({ game_master: user_data.uid, game_member_count: 1, members: [{ ...user_data }], refer_code: code }) //add game and get ID
    var path = this.afs.doc(doc.path).ref.id;
    await this.afs.doc(`users/${user_data.uid}`).set({ active_game: path }, { merge: true })

    await this.afs.doc("games-ref/" + path).set({ game_code: code, game_id: path }) //add game to game-link COLLECTION

  
      //shadow and subscribe initialize again
    //this.subscribeToGame() //no need to subscribe again
  
  }



 async joinGame(id){

    let user_data =  this.userStore.user_data()
    var fieldvalue = firebase.firestore.FieldValue;
    // //add to array
    let docs = await this.afs.collection('games-ref', ref => ref.where('game_code', '==', id)).get().toPromise()    
    
    docs.docs.forEach(doc =>{
      let { game_id } = doc.data()
      user_data = Object.assign({}, user_data, {active_game: game_id})
      console.log(doc.data())
      this.afs.doc(`users/${user_data.uid}`).set({ active_game: game_id }, { merge: true })
      this.afs.collection("games").doc(game_id).update({ "members": fieldvalue.arrayUnion({ ...user_data }) })
     this.subscribeToGame()
     //no need
    })
    
  }

 
  async leaveGame(){
    //remove from user doc
    //remove from players array

    let my_ = this.userStore.user_data() //snapshot.
    let filter = this.gs.removeGameMember(my_.uid)
    await this.afs.doc(`games/${my_.active_game}`).update({members: filter })
    await this.afs.doc(`users/${my_.uid}`).update({active_game:null}) //1
    // this.gs.setToEmpty()
    
    
   
  }


  public generateUIDWithTime(){
    return `${Date.now()}- ${this.generateUID()}`;
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