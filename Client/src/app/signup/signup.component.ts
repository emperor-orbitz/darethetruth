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
  onSubmit: boolean;
  //email_taken:Boolean= false;
  constructor(private auth:AuthService, private router: Router, private afs:AngularFirestore) { }

  ngOnInit(): void {}


  signup(form: NgForm){
    this.onSubmit = true
    this.error.active = false
    if(form.invalid){
      this.onSubmit = false

       return;
     }
     else{
      //check database for username if present
      this.auth.checkUsername(form.value.username).then(
        (doc)=>{
          this.onSubmit = true

           if(doc.length==0){
             //register in database
          this.auth.createUser({username:form.value.username,email: form.value.email.toLowerCase(), password: form.value.password})
          .then(user =>{
            this.onSubmit = false
            alert("User created successfully!")
            this.router.navigate(["login"])
            console.log(user, "user is void")
          },
          fail =>{
            this.onSubmit = false
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
