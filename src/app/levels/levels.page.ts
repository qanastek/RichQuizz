import { BehaviorSubject } from 'rxjs';
import { DatabaseService } from './../services/database.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';

export interface Levels {
  name: string,
  points: number,
  done: number
}

export interface LevelsDone {
  id: number,
  name: string,
  quantity: number
}

@Component({
  selector: 'app-levels',
  templateUrl: './levels.page.html',
  styleUrls: ['./levels.page.scss'],
})
export class LevelsPage implements OnInit {

  theme: string = this.route.snapshot.paramMap.get('theme');  // Thème
  image: string;                    // Image du thème
  AllUnlockAt: Array<Levels>;       // Palliers d'unlock de chaque level
  DonePerLevels: Array<LevelsDone>; // Nombre de quizz réussit par levels

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public db: DatabaseService,
    public toastController: ToastController,
  ) {
  }

  ngOnInit() {

    this.GetImageUrl();

    // Refresh le compteur à chaque load de la page
    this.refreshCounter();
    
    // Charge tout les palliers de dévérouillage
    this.UnlockAtLoad();

    this.DoneCountLevels(this.theme);

  }

  private GetImageUrl(): any {
    this.db.getThemeInfos(this.theme)
    .then(data => {
      data = JSON.parse(data);
      this.image = data.image;
    });
  }

  public DoneCountLevels(theme: string): any {

    this.db.getDonePerLevels(theme)
    .then(data => {
      this.DonePerLevels = JSON.parse(data);

      this.AllUnlockAt.forEach(item => {
        item.done = this.getDoneLevel(item.name);
      });

    })
    .catch(e => console.error(e));

  }

  // Renvoie le nombre de quizz réussit dans ce level
  public getDoneLevel(level: string): any {

    var index = this.DonePerLevels.findIndex(x => x.name === level);
    return this.DonePerLevels[index].quantity;
  }

  // Actualise le nombre de quizz réussit dans ce thème
  public refreshCounter(): any {
    this.db.getWonCounter(this.theme);    
  }

  public UnlockAtLoad(): any {
   
   this.db.getUnlockAt()
    .then(data => {

      this.AllUnlockAt = JSON.parse(data);

    })
    .catch(e => console.error(e));

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
