import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(private router: Router){}

  GoRules()
  {
    this.router.navigate(["rules"]);
  }
  
  GoScores()
  {
    this.router.navigate(["scores"]);
  }

  GoThemes()
  {
    this.router.navigate(["themes"]);
  }

}