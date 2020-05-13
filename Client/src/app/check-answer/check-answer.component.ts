import { Component, OnInit } from '@angular/core';
import { GameStoreService } from '../game-store.service';
import { GameService } from '../game.service';
//import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {JoinGameComponent} from "../join-game/join-game.component"

@Component({
  selector: 'app-check-answer',
  templateUrl: './check-answer.component.html',
  styleUrls: ['./check-answer.component.css']
})
export class CheckAnswerComponent implements OnInit {
  isLoading: boolean;
  active_game: any;
  quests: any;
  game: any;
  user:any

  constructor( private gameService: GameService, private gs: GameStoreService) { }

  ngOnInit(): void {
    
    this.gs.game$.subscribe({
      next:(nxt)=> {
        if (nxt == null) { this.isLoading = true }
          else if (nxt.length == 0) {
            console.log("his", nxt)
            this.isLoading = false
            this.active_game = null
            
          }
          else {
            this.user = this.gameService.user_data
            this.isLoading = false
            this.active_game = true;
            this.quests = nxt[0].quests.reverse() //reverse order ascending
            this.game = nxt[0]
            
            
          }
      }
    })
   
  }

  
  replyChallenge(): void {
  //   const dialogRef = this.dialog.open(JoinGameComponent, {
  //     width: '250px',
  //     data: {name: "j", animal: "jkknjk"}
  //   });

  //   dialogRef.afterClosed().subscribe(
  //     {
  //     next: (result) => {
  //     console.log('The dialog was closed');
  //     //this.animal = result;
  //   }
  // })

  let answer = prompt("Type your custom dare/truth question here", "")
  console.log(answer)

}






}
