import { Component, OnInit } from '@angular/core';
import {AuthService} from "../auth.service"
import { NgForm } from '@angular/forms';
import { Route, Router } from '@angular/router';
import * as firebase from "firebase/app"


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  title= 'Login';
  error = {
    active:false,
    message:""
  }

  constructor(private auth:AuthService, private router: Router) { }

  ngOnInit(): void {
  }



  
   login(form: NgForm){
    this.error.active =false

    if(form.invalid){
       return;
     }
     else{
      this.auth.login({email: form.value.email, password: form.value.password})
      .then( (user) =>{
        let {email, displayName, uid, photoURL } = user.user

       localStorage.setItem("dtd_user", JSON.stringify({email, displayName, uid, photoURL, active_game:null}))
       window.location.href="/app"
      // this.router.navigate(["/app"])
      },
      (fail) => {
     this.error={
       active:true,
       message:fail.message
     }
  
      })
      
      
      }
   }


}
