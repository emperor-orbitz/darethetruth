import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router"
import { AngularFirestore } from "angularfire2/firestore"
import { GameService } from '../game.service';
import { GameStoreService } from '../game-store.service';
import * as firebase from "firebase/app"
import { UserStoreService } from "../user-store.service"
import {Router} from "@angular/router"


@Component({
  selector: 'app-truth-options',
  templateUrl: './truth-options.component.html',
  styleUrls: ['./truth-options.component.css']
})
export class TruthOptionsComponent implements OnInit {

  selected_darer: String = "";
  selected_daree: String = ""
  isLoading = true
  truth_content = ""
  questions =[]
  constructor(private route:Router, private userStore: UserStoreService, private activeRoute: ActivatedRoute, private afs: AngularFirestore, private gameService: GameService, private gameServiceStore: GameStoreService) {

  }

  ngOnInit(): void {
    //get the id from router params and find user data in store
    //we need to subscribe here
    //Also, load random three truth questions from DB

    this.findQuestions()
    
   

    let player_id = this.activeRoute.snapshot.params["daree_id"]
    this.gameServiceStore.game$.subscribe(
      {
        next: (nxtData) => {
          if (nxtData == null) {
            //loading store
            this.isLoading=false
          }
          else {
            this.isLoading = false;
            let { email, username, uid } = nxtData[0].members.filter(v => v.uid == player_id)[0]
            this.selected_daree = username
          }
        }
      })



  }


  truthyUser() {

    if(this.truth_content.length < 15){
      alert("Not enough words for a truthy question")
      return;
    }
    let active_game = this.userStore.user_data().active_game;
    var fieldvalue = firebase.firestore.FieldValue;
    let challenge_id = Date.now()+ this.gameService.generateUIDWithTime()
    let daree = this.gameServiceStore.findGamePlayer(this.activeRoute.snapshot.params["daree_id"])
    let darer = this.gameServiceStore.findGamePlayer(this.activeRoute.snapshot.params["darer_id"])
    
    let data = {
      id:challenge_id,
       darer_data: darer,
       daree_data: daree,
       question:{
         type:"TRUTH",
         content:this.truth_content
       },
       answer:null
     }
     //we cant rely on darer.active game again
     this.afs.collection("games").doc(active_game).set({  isLocked:"LOCKED", "quests": fieldvalue.arrayUnion({ ...data })}, {merge:true} )
     this.route.navigate(['app'])
   

  }


  autoTruthy(data){
    let active_game = this.userStore.user_data().active_game;
    var fieldvalue = firebase.firestore.FieldValue;
    let challenge_id = Date.now()+ this.gameService.generateUIDWithTime()
    let daree = this.gameServiceStore.findGamePlayer(this.activeRoute.snapshot.params["daree_id"])
    let darer = this.gameServiceStore.findGamePlayer(this.activeRoute.snapshot.params["darer_id"])
    
    let question = {
      id:challenge_id,
       darer_data: darer,
       daree_data: daree,
       question:{
         type:data.type,
         content:data.content
       },
       answer:null
     }
     //we cant rely on darer.active game again
     this.afs.collection("games").doc(active_game).set({  isLocked:"LOCKED", "quests": fieldvalue.arrayUnion({ ...question })}, {merge:true} )
     this.route.navigate(['app'])
   
  }


  randomizer(data_array:Array<any>){
    
    //randomixe the array
    var item1 = data_array[Math.floor(Math.random() * data_array.length)];
    var item2 = data_array[Math.floor(Math.random() * data_array.length)];
    var item3 = data_array[Math.floor(Math.random() * data_array.length)];
    
    this.questions =[item1, item2]
    if(item1.content == item2.content){

      this.questions[1] =item3
    }

  }

  findQuestions(){
    this.afs.collection("truth-question",qFn=> qFn.limit(15)).get().toPromise().then(
      doc=>{
        let xx =[]
        doc.forEach(n=> {
          xx.push(n.data())
          console.log(n.data()) 
        })
        console.log("xxx", xx)
        this.randomizer(xx)

      }
    )

  }

selectQuestion(question:object){
  console.log("selected this right?", question)
}
shuffleQuestion(){
  alert("I have suffled a new set of questions")
}


}
