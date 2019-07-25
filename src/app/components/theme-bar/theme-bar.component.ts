import { Component, OnInit, Input } from '@angular/core';
import { DatabaseService } from 'src/app/services/database.service';

@Component({
  selector: 'app-theme-bar',
  templateUrl: './theme-bar.component.html',
  styleUrls: ['./theme-bar.component.scss']
})
export class ThemeBarComponent implements OnInit {

  @Input('theme') theme: string;
  theme_image: string;

  constructor(private db: DatabaseService) { }

  ngOnInit() {

    this.db.getThemeInfos(this.theme)
    .then(data => {
      data = JSON.parse(data);
      this.theme_image = data.image;
    });
    
  }

}
