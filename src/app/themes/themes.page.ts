import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { DatabaseService, Quizz } from './../services/database.service';

@Component({
  selector: 'app-themes',
  templateUrl: './themes.page.html',
  styleUrls: ['./themes.page.scss'],
})
export class ThemesPage implements OnInit {

  constructor(
    private router: Router,
    private db: DatabaseService,
    public toastController: ToastController,
  ){}
  
  GoScores() {
    this.router.navigate(["scores"]);
  }

  GoPlay(theme: string) {

    this.db.getDatabaseState().subscribe(ready =>{

      if (ready) {

        this.db.getQuizzTheme(theme)
        .then(TheQuizz => {

          if (TheQuizz !== null) {
            // Transforme l'objet TheQuizz en string
            this.router.navigate(["play", JSON.stringify(TheQuizz)]);
          }
          else {
            this.presentToast(theme);
            this.router.navigate(['themes']);
          }

        });
        
      }

    })
  }

  async presentToast(theme: string) {
    const toast = await this.toastController.create({
      message: 'No more quizz left in the ' + theme + ' section.',
      duration: 2000
    });
    toast.present();
  }

  GoAddItem() {
    this.router.navigate(["add"]);
  }

  ngOnInit() {
  }

}
