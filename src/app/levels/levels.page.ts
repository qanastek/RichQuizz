import { DatabaseService } from './../services/database.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-levels',
  templateUrl: './levels.page.html',
  styleUrls: ['./levels.page.scss'],
})
export class LevelsPage implements OnInit {

  theme: string = this.route.snapshot.paramMap.get('theme');
  countDone: number;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private db: DatabaseService,
    public toastController: ToastController,
  ) { }

  ngOnInit() {

    this.refreshCounter();

  }

  public refreshCounter(): any {

    this.db.getWonCounter(this.theme)
    .then(data => {
      this.countDone = data;
    });
    
  }

  async presentToast(theme: string) {
    const toast = await this.toastController.create({
      message: 'No more quizz left in the ' + theme + ' section.',
      duration: 2000
    });
    toast.present();
  }

  GoPlay(theme: string, difficulty: string) {

    this.db.getDatabaseState().subscribe(ready =>{

      if (ready) {

        // Vérifier il si existe bien des quizz de disponibles
        this.db.getQuizzFromLevels(theme, difficulty)
        .then(TheQuizz => {

          if (TheQuizz !== null) {
            this.router.navigate(["play", JSON.stringify(TheQuizz)]);
          }
          else {
            this.presentToast(theme);
          }

        });
        
      }

    })
  }

}
