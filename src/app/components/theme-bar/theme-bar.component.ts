import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-theme-bar',
  templateUrl: './theme-bar.component.html',
  styleUrls: ['./theme-bar.component.scss']
})
export class ThemeBarComponent implements OnInit {

  @Input('theme') theme: string;
  @Input('rq_color') rq_color: string;

  constructor() { }

  ngOnInit() { }

}
