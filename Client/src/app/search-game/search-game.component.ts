import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-search-game',
  templateUrl: './search-game.component.html',
  styleUrls: ['./search-game.component.css']
})
export class SearchGameComponent implements OnInit {

  title:String = "Search Game"
  constructor() { }

  ngOnInit(): void {
  }

}
