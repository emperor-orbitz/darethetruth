import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth'
import { AngularFirestore } from 'angularfire2/firestore'
import { first } from "rxjs/operators"
import { User } from 'firebase';
import { GameService } from './game.service';



@Injectable({
  providedIn: 'root'
})
export class AuthService {
  loggedInStatus: Promise<User>
  user_info:Promise<any>
  user_datum:Promise<any>
  constructor(private afa: AngularFireAuth, private afs: AngularFirestore) {

    this.loggedInStatus = this.isloggedin()
    this.user_info = this.user_data()
    
  }


  async createUser(user:any) {
    //create user and save to DB
   let e = await this.afa.auth.createUserWithEmailAndPassword(user.email, user.password)

   return this.afs.doc(`users/${e.user.uid}`).set({
      uid: e.user.uid,
      username:" ", 
      email: user.email, 
      email_verfied:e.user.emailVerified,
      active_game:null
    })
  
  
}

  public async user_data(){
    let user = await this.loggedInStatus
    let data = await this.afs.doc(`users/${user.uid}`).get().pipe(first()).toPromise()
    console.log(data.data(), "this.is from data")
    return data.data()
    }


    
  private isloggedin() {
       return this.afa.authState.pipe(first()).toPromise();
  }


  saveToStorage(data) {
    localStorage.setItem("dtd_user", JSON.stringify({ ...data }))
  }



  login(user) {
    return this.afa.auth.signInWithEmailAndPassword(user.email, user.password)
  }



  logout(){
    localStorage.removeItem('dtd_user')
    localStorage.removeItem("game_members")
    return this.afa.auth.signOut()

  }


}
