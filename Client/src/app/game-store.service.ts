import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs"
import {UserStoreService} from "./user-store.service"
import * as firebase  from "firebase/app"

@Injectable({
  providedIn: 'root'
})
export class GameStoreService{
  //the Game Store lies here

  public readonly _game = new BehaviorSubject<any>(null)
  public readonly game$ = this._game.asObservable()

  public addGame(game):void{
    //console.log("added", game)
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




  private async questFind(active_game_id){

    
    //get active game and update
  return await firebase.firestore().doc(`games/${active_game_id}`).get();
            
 
  // let quest_id = quest_object.id
  // let quest = this._game.getValue()[0].quests.reverse()
  //   //find in array with ID
  //   let mapped = quest.map(x=>{
  //     if(x.id == quest_id){
  //       x = quest_object
  //     }
  //     return x
  //   })
  //   console.log("mapped", mapped)


  // return mapped;

  }

public async questMerge(active_game_id, quest_object){
return await this.questFind(active_game_id).then(data=>{
  
  let quests = data.data().quests

    let quest_id = quest_object.id
  //   //find in array with ID
    let mapped = quests.map(x=>{
      if(x.id == quest_id){
        x = quest_object
      }
      return x
    })
    console.log("mapped", mapped)


  return mapped;

})
}

  
  removeGameMember(uid){
    let members = this._game.getValue()[0].members
    let filter = members.filter(v => v.uid != uid)
    return filter;
  }
   
  setToEmpty(){
   // this._game.unsubscribe()
    //this._game.next([])
  }
}
