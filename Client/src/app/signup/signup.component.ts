import { Component, OnInit } from '@angular/core';
import {AuthService} from "../auth.service"
import { NgForm } from '@angular/forms';
import { Route, Router } from '@angular/router';



@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  title:String ="Signup"
  error = {
    active:false,
    message:""
  }
  //email_taken:Boolean= false;
  constructor(private auth:AuthService, private router: Router) { }

  ngOnInit(): void {}


  signup(form: NgForm){
    this.error.active = false
    if(form.invalid){
       return;
     }
     else{
      this.auth.createUser({email: form.value.email, password: form.value.password})
          .then(user =>{
            console.log(user, "user is void")
          },
          fail =>{
           console.log(fail)
              this.error.active = true;
              this.error.message = fail.message
            
          })
      
      
      }
   }
}
