import { Component, OnInit } from '@angular/core';

//import { MyDB } from './database-vanilla';
//import { MyDB } from './database-typescript';
import { MyDB } from './database-typescript-without-relations';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app works!';

  constructor() {}

  ngOnInit() {
    let db = new MyDB;

    console.log( 'This database: ', db.allGenres() );
  }

}
