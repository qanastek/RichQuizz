import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-rules',
  templateUrl: './rules.page.html',
  styleUrls: ['./rules.page.scss'],
})
export class RulesPage implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  GoThemes()
  {
    this.router.navigate(["themes"]);
  }

}
