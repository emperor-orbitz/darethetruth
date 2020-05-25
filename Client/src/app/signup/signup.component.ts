import { Component, OnInit } from '@angular/core';
import {AuthService} from "../auth.service"
import { NgForm } from '@angular/forms';
import { Route, Router } from '@angular/router';
import { first, map, take } from 'rxjs/operators';
import { AngularFirestore } from 'angularfire2/firestore';



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
  constructor(private auth:AuthService, private router: Router, private afs:AngularFirestore) { }

  ngOnInit(): void {}


  signup(form: NgForm){
    this.error.active = false
    if(form.invalid){
       return;
     }
     else{
      //check database for username if present
      this.auth.checkUsername(form.value.username).then(
        (doc)=>{
           if(doc.length==0){
             //register in database
          this.auth.createUser({username:form.value.username,email: form.value.email.toLowerCase(), password: form.value.password})
          .then(user =>{
            alert("User created successfully!")
            console.log(user, "user is void")
          },
          fail =>{
           console.log(fail)
              this.error.active = true;
              this.error.message = fail.message
            
          })
      
           }
           else{
            //username has been used
            this.error.active = true;
            this.error.message = "Username has been taken"
           }
           }
      )

      
      }
   }
}
