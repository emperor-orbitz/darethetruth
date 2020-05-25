import { Component, OnInit } from '@angular/core';
import { AngularFirestoreDocument } from "angularfire2/firestore"
import * as firebase from 'firebase/app'
import { AuthService } from "../auth.service"
import { GameService } from '../game.service';
import { GameStoreService } from '../game-store.service';
import {MatDialog} from '@angular/material/dialog';
import { ModalboxComponent } from '../modalbox/modalbox.component';
import {UserStoreService} from "../user-store.service"


@Component({
  selector: 'app-play-game',
  templateUrl: './play-game.component.html',
  styleUrls: ['./play-game.component.css']
})
export class PlayGameComponent implements OnInit {
  game_mode_text ="Start a Game"
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
  notification: boolean = false
  constructor(private US:UserStoreService, private dialog:MatDialog ,private authService: AuthService, private gameService: GameService, private gs: GameStoreService) {
   // this.authService.loggedInStatus.then(e => {this.me = e})
   
    // this.authService.user_data().then(  e=>{
      
    // })
  
  }



  ngOnInit(): void {
   
    this.intialize()

  }


   

  intialize() {
    
    //subscribe to game_store


    this.gs.game$.subscribe(
      {next: (nxt: any) => {
      if (nxt == null) { 
        this.isLoading = true
        
      }

      else if (nxt.length == 0) {
        this.isLoading = false
        this.active_game = false
      }
      else {
        
       
        if(nxt[0].quests ){
          let occur = nxt[0].quests.findIndex(v => v.daree_data.uid == this.US.user_data().uid && v.answer == null)
          let index = occur == undefined? -1 : occur;
          this.notification = index > -1? true : false
        }
          
        this.setUser(this.US.user_data())
        this.isLoading = false
        this.active_game = true;
        this.invite_code =nxt[0].refer_code
        this.members = nxt[0].members
        this.game = nxt[0]
      }
    }
    })
    
  
  }


  copyToClipboard(code){

 var dummy = document.createElement("textarea")
 document.body.appendChild(dummy)
 dummy.value =code
 dummy.select()
 document.execCommand("copy")
 document.body.removeChild(dummy)
 alert("Game Key copied!")
    
  
  }





  async createGame() {
    this.game_mode_text =" Setting up your game..."
    this.gameService.createGame()
  }



  open_box() {
    this.open_join_game_id = true;
  }


  



  leaveGame() {
    this.gameService.leaveGame()

  }


  insertKey(): void {
    const dialogRef = this.dialog.open(ModalboxComponent, {
      width: '300px',
      minHeight:"200px",
      data:{
          type:"GAME-KEY",
          text:"Insert your shortcide here"
     
      }
    });

    dialogRef.afterClosed().toPromise().then(
      
     (result) => {
  
      console.log('The dialog was closed. RESULT:', result );
    }
  )


}


closeNotif(){

  this.notification=false; //closwe Notif
}

private setUser({email, username, uid}){
     this.my_email = email
      this.my_uid =uid
      this.my_username= username
}


}
