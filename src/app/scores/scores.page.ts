import { Component, OnInit } from '@angular/core';
import { DatabaseService } from './../services/database.service';

@Component({
  selector: 'app-scores',
  templateUrl: './scores.page.html',
  styleUrls: ['./scores.page.scss'],
})
export class ScoresPage implements OnInit {

  constructor(
    private db: DatabaseService
  ){ }

  ngOnInit() {
    this.db.loadScores();
  }

}
