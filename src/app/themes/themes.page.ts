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

  public categories = [];

  constructor(
    private router: Router,
    private db: DatabaseService,
    public toastController: ToastController,
  ){
    this.GetItems();
  }
  
  ngOnInit() {
  }

  GoScores() {
    this.router.navigate(["scores"]);
  }

  GoPlay() {
    this.router.navigate(["levels"]);
  }

  async presentToast() {
    const toast = await this.toastController.create({
      message: 'No more quizz left in the section.',
      duration: 2000
    });
    toast.present();
  }

  GoAddItem() {
    this.router.navigate(["add"]);
  }

  GetItems() {
    this.db.GetCategories()
    .then(data => {
      this.categories = JSON.parse(data);
    })
    .catch(e => console.error(e));
  }
}
