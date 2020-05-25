import { Component, OnInit } from '@angular/core';
import { GameStoreService } from '../game-store.service';
import { GameService } from '../game.service';
import {MatDialog} from '@angular/material/dialog';
import { UserStoreService } from '../user-store.service';
import { Router } from '@angular/router';
import { ModalboxComponent } from '../modalbox/modalbox.component';



@Component({
  selector: 'app-check-answer',
  templateUrl: './check-answer.component.html',
  styleUrls: ['./check-answer.component.css']
})
export class CheckAnswerComponent implements OnInit {
  isLoading: boolean=false;
  active_game: any;
  quests: any;
  game: any;
  user:any
  user_id:any

  constructor(private route:Router, private userStore:UserStoreService, private gameService: GameService, private gs: GameStoreService, private dialog:MatDialog) { }

  ngOnInit(): void {
    
    this.gs.game$.subscribe({
      next:(nxt)=> {
        if (nxt == null) {
           this.isLoading = false;
            
        }
          else if (nxt.length == 0) {
            console.log("his", nxt)
            this.isLoading = false
            this.active_game = null
            
          }
          else {
            this.user_id = this.userStore.user_data().uid

            //this.user = this.gameService.user_data
            this.isLoading = false
            this.active_game = true;
            this.quests = nxt[0].quests //reverse order ascending
            this.game = nxt[0]


            
          }
      }
    })
   
  }

  
  replyChallenge(data): void {
    const dialogRef = this.dialog.open(ModalboxComponent, {
      width: '300px',
      minHeight:"200px",
      data:{
          type:"REPLY-CHALLENGE",
          current_game:data,
          game: this.gs._game.getValue()[0].quests,
        //active game ID
        active_game_id:this.userStore.user_data().active_game
      }
    });

    dialogRef.afterClosed().subscribe(
      {
      next: (result) => {
        this.route.navigate(["app"])
      console.log('The dialog was closed. RESULT:', result );

    }
  })


}






}
