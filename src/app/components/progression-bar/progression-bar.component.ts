import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-progression-bar',
  templateUrl: './progression-bar.component.html',
  styleUrls: ['./progression-bar.component.scss'],
})
export class ProgressionBarComponent implements OnInit {

  @Input('value') value: number;
  @Input('goal') goal: number;
  @Input('color1') color1: string;
  @Input('color2') color2: string;
  @Input('width') width: string;

  constructor() {}

  ngOnInit() {
    if (this.value > 100) { this.value = 100; }
  }

}
