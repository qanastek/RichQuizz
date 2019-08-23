import { DatabaseService } from './../services/database.service';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(
    private router: Router,
    private db: DatabaseService
  ){}

  GoRules()
  {
    this.router.navigate(["rules"]);
  }
  
  GoScores()
  {
    this.router.navigate(["scores"]);
  }

  GoPlay()
  {
    this.router.navigate(["levels"]);
  }

  GoDefis()
  {
    this.router.navigate(["quests"]);
  }

}