import { Component, OnInit } from '@angular/core';
import { ModalboxComponent } from '../modalbox/modalbox.component';
import {MatDialog} from '@angular/material/dialog';



//Create simpleTODO first
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  title ='Dashboard'

  constructor(private dialog:MatDialog) {}

  stories: Array<any> =[]
  ngOnInit(): void {


  }

  clickTosayHello( evt){


  }

  logout(){

    const dialogRef = this.dialog.open(ModalboxComponent, {
      width: '300px',
      minHeight:"200px",
      data:{
          type:"LOGOUT-CONFIRM",
     
      }
    });

    dialogRef.afterClosed().subscribe(
      {
      next: (result) => { } // Do nothing
  })


  }

 

}
