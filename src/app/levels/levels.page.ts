import { BehaviorSubject } from 'rxjs';
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

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public db: DatabaseService,
    public toastController: ToastController,
  ) {
  }

  ngOnInit() {

    // Refresh le compteur à chaque load de la page
    this.refreshCounter();
    
    // Charge tout les palliers de dévérouillage
    this.db.UnlockAtLoad();

    this.db.DoneCountLevels();

  }

  // Actualise le nombre de quizz réussit dans ce thème
  public refreshCounter(): any {
    this.db.getWonCounter();
  }

  async presentToast() {
    const toast = await this.toastController.create({
      message: 'No more quizz left in the section.',
      duration: 2000
    });
    toast.present();
  }

  GoPlay(difficulty: string) {

    this.db.getDatabaseState().subscribe(ready =>{

      if (ready) {

        // Vérifier il si existe bien des quizz de disponibles
        this.db.getQuizzFromLevels(difficulty)
        .then(TheQuizz => {

          if (TheQuizz !== null) {
            this.router.navigate(["play", JSON.stringify(TheQuizz)]);
          }
          else {
            this.presentToast();
          }

        });
        
      }

    })
  }

}
