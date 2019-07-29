import { Component, OnInit } from '@angular/core';
import { DatabaseService } from './../services/database.service';

@Component({
  selector: 'app-scores',
  templateUrl: './scores.page.html',
  styleUrls: ['./scores.page.scss'],
})
export class ScoresPage implements OnInit {

  public scores = [];

  constructor(
    private db: DatabaseService
  )
  {
    this.loadScores();

  }

  ngOnInit() {
  }

  loadScores(): any {
    
    this.db.loadScoresThemes()
    .then(response => {
      this.scores = JSON.parse(response);      
    })
    .catch(e => console.error(e));

  }

}
