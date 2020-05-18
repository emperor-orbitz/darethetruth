import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserStoreService {

  constructor() { }

  public readonly _user = new BehaviorSubject<any>(null)
  public readonly user$ = this._user.asObservable()

  public addUser(user):void{
   // console.log("added", user)
    this._user.next(user)
  }

  public removeUser(user){ }


  // public findUser(user){

  //   let user_data = this._user.getValue()[0].members.filter((v, i, a) =>{ return v.uid == player_id })
  //   return user_data[0];
  // }

  public user_data(){
    return this._user.getValue()
  }
  
}
