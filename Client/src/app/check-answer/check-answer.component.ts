import { Component, OnInit } from '@angular/core';
import { GameStoreService } from '../game-store.service';
import { GameService } from '../game.service';
import {MatDialog} from '@angular/material/dialog';
import { GiveAnswerComponent } from '../give-answer/give-answer.component';
import { UserStoreService } from '../user-store.service';
import { Router } from '@angular/router';



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
  user_id:any

  constructor(private route:Router, private userStore:UserStoreService, private gameService: GameService, private gs: GameStoreService, private dialog:MatDialog) { }

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
            this.user_id = this.userStore.user_data().uid
            console.log(this.user_id, "this is me gan")
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
    const dialogRef = this.dialog.open(GiveAnswerComponent, {
      width: '250px',
      data:{
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
