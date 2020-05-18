import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth'
import { AngularFirestore } from 'angularfire2/firestore'
import { first, take } from "rxjs/operators"
import { User } from 'firebase';
import { UserStoreService } from "./user-store.service"



@Injectable({
  providedIn: 'root'
})
export class AuthService {
  loggedInStatus: Promise<User>
  user_info: Promise<any>
  user_datum: Promise<any>
  constructor(private afa: AngularFireAuth, private afs: AngularFirestore, private user_store: UserStoreService) {

    this.subscribeToUser()

  }


  async createUser(user: { username: string, email: string, password: string }) {
    //create user and save to DB

    let e = await this.afa.auth.createUserWithEmailAndPassword(user.email, user.password)

    return this.afs.doc(`users/${e.user.uid}`).set({
      uid: e.user.uid,
      username: user.username,
      email: user.email,
      email_verfied: e.user.emailVerified,
      active_game: null
    })


  }





  async subscribeToUser() {
    let user = await this.isloggedin()

    let data = await this.afs.doc(`users/${user.uid}`).get().pipe(take(1)).toPromise()
    //console.log("add herrrrrr", data.data())
    this.user_store.addUser(data.data())
    //console.log("i added her here", this.user_store.user_data())


  }



  public async user_data$() {

    let user = await this.isloggedin()
    if (user == null) { return null } //do nothing
    else {
      //console.log("i got here, use", user)
      return this.afs.doc(`users/${user.uid}`).valueChanges()

    }

  }



  public async user_data() {
    let user = await this.isloggedin()

    let data = await this.afs.doc(`users/${user.uid}`).get().pipe(take(1)).toPromise()
    //        console.log(data.data(), "this.is from data")
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




  checkUsername(username: String) {

    return this.afs.collection("users", (qryFn) => qryFn.where("username", "==", username)).get().toPromise()
      .then(doc => doc.docs.map(e => e.data()))

  }


  logout() {
    localStorage.removeItem('dtd_user')
    localStorage.removeItem("game_members")
    return this.afa.auth.signOut()

  }


}
