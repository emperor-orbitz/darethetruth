import { Component, OnInit } from '@angular/core';
import { AngularFirestoreDocument, AngularFirestore } from "angularfire2/firestore"
import * as firebase from 'firebase/app'
import { map, take } from 'rxjs/operators';



@Component({
  selector: 'app-play-game',
  templateUrl: './play-game.component.html',
  styleUrls: ['./play-game.component.css']
})
export class PlayGameComponent implements OnInit {

  title: String = "Players"
  activity: AngularFirestoreDocument
  game_link: String
  active_game: any = false
  user_id: any
  active_players: Array<any>[]
  members: Array<any> = []
  open_join_game_id: Boolean = false
  join_game_id: any

  constructor(private afs: AngularFirestore) {
    
   // this.user_id = JSON.parse(localStorage.getItem("dtd_user"))['user'].uid

  }


  ngOnInit(): void {
    
    this.intialize()

  }



   intialize(){
    //check if current game exists
    const user = localStorage.getItem("dtd_user")

      const uuid = JSON.parse(user).uid;
     let vv= this.afs.doc(`users/${uuid}`).valueChanges().pipe(take(1)).subscribe((data:any) => {
      let { active_game } = data;
     console.log(data, "data")

      if (active_game) {

        //subscribe to the game data
        this.afs.doc(`games/${active_game}`).valueChanges().subscribe((e: any) => {
          this.active_game = true
          this.members = e.members
        })
      }
      else {
        this.active_game = null;

      }
    })
  

  }



  getUserId(){
    const user = localStorage.getItem("dtd_user")
    return JSON.parse(user).uid
    }


  async createGame() {
    //create a game
    //Add to user active game
    let code = this.generateUID()
    const uuid = this.getUserId()

    var doc = await this.afs.collection("games").add({ game_master: uuid, game_member_count: 1, members: [uuid], refer_code: code }) //add game and get ID
    var path = this.afs.doc(doc.path).ref.id;
    
    await this.afs.doc("games-ref/"+path).set({ game_code: code, game_id: path }) //add game to game-link COLLECTION

    await this.afs.doc(`users/${uuid}`).set({ active_game: path }, { merge: true }).then(() => {

      //shadow and subscribe initialize again
      this.members = [uuid];
      this.intialize()
      //alert('new game started');

    })

  }



  open_box() {
    this.open_join_game_id = true;
  }


  joinGame() {
    //enter refer code
    const uuid = this.getUserId()
    var fieldvalue = firebase.firestore.FieldValue;
    var fbs = firebase.firestore();

    this.open_join_game_id = true;
    var id = this.join_game_id;
    //add to array
    var subsc = this.afs.collection('games-ref', ref => ref.where('game_code', '==', id)).get().subscribe(e=>{
      e.forEach(data=>{
       let { game_id } = data.data()
      fbs.collection("games").doc(game_id).update({ "members": fieldvalue.arrayUnion(uuid) }) //add to list
      this.afs.doc(`users/${uuid}`).set({ active_game: game_id }, { merge: true })
      
      this.afs.doc(`games/${game_id}`).valueChanges().subscribe( (e:any) =>{
        
        //get updated user_data
                  this.members = e.members;
                   this.active_game = true
                    })
      })
      subsc.unsubscribe() //unsubscribe

    })

  }



leaveGame(){

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
