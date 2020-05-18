import { Component, OnInit } from '@angular/core';
import { AngularFirestoreDocument, AngularFirestore } from "angularfire2/firestore"
import * as firebase from 'firebase/app'
import { map, take } from 'rxjs/operators';
import { AuthService } from "../auth.service"
import { GameService } from '../game.service';
import { GameStoreService } from '../game-store.service';



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
  members: any = ""
  open_join_game_id: Boolean = false
  join_game_id: any
  me:firebase.firestore.DocumentData
  new_user: firebase.User
  my_email:string ="Email"
  my_username:any="User"
  my_uid:string=" "
  isLoading: boolean = true
  game:any ={
    game_master:"",
    isLocked:"FREE" //LOCKED or OPEN STATE  
  }
  pendingAction: boolean;
  invite_code:string

  constructor( private authService: AuthService, private gameService: GameService, private gs: GameStoreService) {
   // this.authService.loggedInStatus.then(e => {this.me = e})
   
    this.authService.user_data().then(  e=>{
      this.my_email =e.email
      this.my_uid =e.uid
      this.my_username= e.username
    })
  
  }



  ngOnInit(): void {
   
    this.intialize()

  }


   

  intialize() {
    
    //subscribe to game_store


    this.gs.game$.subscribe(
      {next: (nxt: any) => {
      if (nxt == null) { this.isLoading = true }
      else if (nxt.length == 0) {
        this.isLoading = false
        this.active_game = null
        this.pendingAction =false
      }
      else {

        let recent_quest = nxt[0].quests == null ? null :nxt[0].quests[0]
        if(recent_quest == null){} //do nothing

        else if((recent_quest.daree_data.uid == this.gs.game_data().uid) && recent_quest.answer == null){
        //pending action. Someone dared you
       // console.log(recent_quest, "this is recent queststst")

        this.pendingAction = true
        }

        this.isLoading = false
        this.active_game = true;
        this.invite_code =nxt[0].refer_code
        this.members = nxt[0].members
        this.game = nxt[0]
      }
    }
    })
    
  
  }


  doesNotIncludeMe(big, uid){

    let aa= big.find(v=> v.uid == uid)
    console.log(aa)
    return
    
  
  }



  async createGame() {
    this.gameService.createGame()
  }



  open_box() {
    this.open_join_game_id = true;
  }


  joinGame() {
    var id = this.join_game_id;
    //add to array
    this.gameService.joinGame(id)

  }



  leaveGame() {
    this.gameService.leaveGame()
  }




}
