import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-give-answer',
  templateUrl: './give-answer.component.html',
  styleUrls: ['./give-answer.component.css']
})
export class GiveAnswerComponent implements OnInit {

  title:String ="Submit Answer"
  constructor() { }

  ngOnInit(): void {
  }

}
