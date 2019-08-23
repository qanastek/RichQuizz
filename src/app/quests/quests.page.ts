import { Component, OnInit } from '@angular/core';
import { DatabaseService } from '../services/database.service';

@Component({
  selector: 'app-quests',
  templateUrl: './quests.page.html',
  styleUrls: ['./quests.page.scss'],
})
export class QuestsPage implements OnInit {

  constructor(
    public db: DatabaseService
  ) { }

  ngOnInit() {
  }

  collect(id: number, reward: number) {
    this.db.collect(id, reward);
  }

}
