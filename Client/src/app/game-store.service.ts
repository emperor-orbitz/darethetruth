import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs"

@Injectable({
  providedIn: 'root'
})
export class GameStoreService{
  //the Game Store lies here

  public readonly _game = new BehaviorSubject<any>(null)
  public readonly game$ = this._game.asObservable()

  public addGame(game):void{
    console.log("added", game)
    this._game.next(game)
  }

  public removeGame(game){ }


  public findGamePlayer(player_id){

    let user_data = this._game.getValue()[0].members.filter((v, i, a) =>{ return v.uid == player_id })
    return user_data[0];
  }

  public game_data(){
    return this._game.getValue()
  }

}
