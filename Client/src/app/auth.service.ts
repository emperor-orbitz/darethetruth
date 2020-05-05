import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth'




@Injectable({
  providedIn: 'root'
})
export class AuthService {
  loggedInStatus:any;

  constructor(private afa:AngularFireAuth) {
   
    
   }

   createUser(user){
      return this.afa.auth.createUserWithEmailAndPassword(user.email, user.password)
               
  }


  isloggedin(){

    let storage_data = JSON.parse(localStorage.getItem("dtd_user"))

      // return this.afa.authState.toPromise().then((res)=>{
      //   console.log(res, "dsds")
      //     if (res.uid){
      //       let {email, displayName, uid, photoURL } = res
      //       if(storage_data ==null) this.saveToStorage({email, displayName, uid, photoURL, active_game:null});
      //       return true
      //     }
      //     return false;
      // })
      // .catch(err=>{console.log(err,"erroror")})
    


    
  }

 
  saveToStorage(data){
    localStorage.setItem("dtd_user", JSON.stringify({...data}))

  }

 

login(user){

return this.afa.auth.signInWithEmailAndPassword(user.email, user.password)
}


logout(){
  return this.afa.auth.signOut()
  
}


}
