import { Component, OnInit, Input, Output } from '@angular/core';
import {AuthService} from "../auth.service"
import { Router } from '@angular/router';


//Create simpleTODO first
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  title ='Dashboard'

  constructor(private auth: AuthService, private route:Router) {}

  stories: Array<any> =[]
  ngOnInit(): void {


  }

  clickTosayHello( evt){


  }


  logout(){
this.auth.logout().then(success=>{
  localStorage.removeItem("dtd_user")
    this.route.navigate(['login'])
})
.catch(err=>{
  console.log("there was an error heere")
})
  }


}
