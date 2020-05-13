import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router"
import { GameStoreService } from '../game-store.service';
import * as firebase from 'firebase/app';
import { AngularFirestore } from 'angularfire2/firestore';
import { GameService } from '../game.service';

interface Store{
  members:Array<[]>
}

@Component({
  selector: 'app-dare-options',
  templateUrl: './dare-options.component.html',
  styleUrls: ['./dare-options.component.css']
})
export class DareOptionsComponent implements OnInit {
  selected_darer:String=""
  selected_daree:String=""
  isLoading: Boolean= true
  dare_content:""

  constructor(private afs:AngularFirestore,private activeRoute: ActivatedRoute,  private gameService:GameService, private gameServiceStore:GameStoreService) { }

 
  ngOnInit(): void {
    //get the id from router params and find user data in store
    //we need to subscribe here
    let player_id = this.activeRoute.snapshot.params["daree_id"]
    this.gameServiceStore.game$.subscribe( {
      next:(nxtData:any) =>{
      if(nxtData == null){
        //loading store
      }
      else{
        this.isLoading= false;
        let { email, username, uid } = nxtData[0].members.filter(v => v.uid == player_id)[0]
        console.log("this is my email data", email)
        this.selected_daree = email
      }

      
    }})

  }



  daryUser(){
    alert(this.dare_content)
    var fieldvalue = firebase.firestore.FieldValue;

   let daree = this.gameServiceStore.findGamePlayer(this.activeRoute.snapshot.params["daree_id"])
   let darer = this.gameServiceStore.findGamePlayer(this.activeRoute.snapshot.params["darer_id"])
   
   let data = {
      darer_data: darer,
      daree_data: daree,
      question:{
        type:"DARE",
        content:this.dare_content
      },
      answer:null
    }

    this.afs.collection("games").doc(darer.active_game).set({isLocked:"LOCKED", "quests": fieldvalue.arrayUnion({ ...data })}, {merge:true} )



  }
}
