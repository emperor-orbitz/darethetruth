import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {AngularFireStorage} from "angularfire2/storage"
import {AngularFirestore} from "angularfire2/firestore"
import {GameStoreService} from "../game-store.service"

interface Data{
current_game:{
daree_data:{uid:String}
},
game:Array<any>,
active_game_id:String
}

@Component({
  selector: 'app-give-answer',
  templateUrl: './give-answer.component.html',
  styleUrls: ['./give-answer.component.css']
})
export class GiveAnswerComponent implements OnInit {

  title:String ="Submit Answer"
  answer:String ="Reply"
  proof:File 
  downloadURL:String=""
  taskComplete:String
  constructor(private gs:GameStoreService ,@Inject(MAT_DIALOG_DATA) public data:Data, private afs: AngularFirestore,public dialogRef:MatDialogRef<GiveAnswerComponent>, private fireStorage:AngularFireStorage) { }

  ngOnInit(): void {
    console.log("I got this data from you oo", this.data)
  }


  closeDialog() {
    //answer question/submit and close Modal
  
    //save image first then save URL to answer object in Database
    const rand= Math.random().toString(36).substring(2)
    let id = `quests/${this.data.current_game.daree_data.uid}-${rand}-${Date.now()}-${this.proof.name}`
    let storage_ref = this.fireStorage.ref(id)
    let uploadTask = storage_ref.put(this.proof)
    uploadTask.task.then(next=>{
      let subsc = storage_ref.getDownloadURL().subscribe({
        next:(nxt)=>{
          subsc.unsubscribe()
             this.afs.collection('files').add( { downloadURL: nxt, author: this.data.current_game.daree_data.uid }); // STORE infirebase storage
             //ADD TO GAME QUESTS
             let answer = { text: this.answer, proof: nxt } 
             let dataToSave = Object.assign({}, this.data.current_game, {answer:answer})

              let quests = this.gs.questMerge(dataToSave)
              this.afs.collection("games").doc(`${this.data.active_game_id}`).update({ quests: quests, isLocked:"OPEN" })

              this.dialogRef.close('SUCCESS');

        }
      })
    })
 
  }


  changeFile(files:FileList){
    this.proof = files.item(0)
  }
}
