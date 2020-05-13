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
  me: any
  new_user: firebase.User
  isLoading: boolean = true
  game:any ={
    game_master:"",
    isLocked:"FREE" //FREE, LOCKED, OPEN
  }
  pendingAction: boolean;


  constructor(private afs: AngularFirestore, private authService: AuthService, private gameService: GameService, private gs: GameStoreService) {
    this.authService.loggedInStatus.then(e => {this.me = e})
   // this.me = this.gameService.user_data
    console.log(this.gameService.user_data, "ddfdfdfdfdfd")
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
      }
      else {

        
        let recent_quest = nxt[0].quests[nxt[0].quests.length -1]
        if(recent_quest.daree_data.uid == this.gameService.user_data.uid){
        //pending action. Someone dared you
          this.pendingAction = true
        }

        this.pendingAction=true
        this.isLoading = false
        this.active_game = true;
        this.members = nxt[0].members
        this.game = nxt[0]
      }
    }
    })
    
  
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

  }




}
