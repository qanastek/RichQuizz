import { WinComponent } from './../components/win/win.component';
import { FailComponent } from './../components/fail/fail.component';
import { AskAdComponent } from './../components/ask-ad/ask-ad.component';
import { DatabaseService, Quizz } from './../services/database.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
// import { Vibration } from '@ionic-native/vibration/ngx';
import { AlertController, ModalController } from '@ionic/angular';
import { BehaviorSubject } from 'rxjs';
import { AdvertisementComponent } from '../components/advertisement/advertisement.component';

@Component({
  selector: 'app-play',
  templateUrl: './play.page.html',
  styleUrls: ['./play.page.scss'],
})
export class PlayPage implements OnInit {

  quizz: any = JSON.parse(this.route.snapshot.paramMap.get('quizz'));
  nextQuizz: any;

  constructor(
    private route: ActivatedRoute,
    public db: DatabaseService,
    private router: Router,
    // private vibration: Vibration,
    public alertController: AlertController,
    public modalController: ModalController
  ) { }

  ngOnInit() {
    this.refreshCounter();
    this.db.refreshDiamonds()
  }

  async fail() {

    // animated: true,
    // keyboardClose: true,
    // showBackdrop: false,

    const modal = await this.modalController.create({
      component: FailComponent,
      componentProps: {
        theme: this.quizz.category_name
      },
      cssClass: 'ask-ad-custom',
      backdropDismiss: false
    });

    return await modal.present();
  }

  async AskAd() {

    // animated: true,
    // keyboardClose: true,
    // showBackdrop: false,

    const modal = await this.modalController.create({
      component: AskAdComponent,
      componentProps: {
        theme: this.quizz.category_name
      },
      cssClass: 'ask-ad-custom',
      backdropDismiss: false
    });

    return await modal.present();
  }

  async dead(answer: string) {

    const alert = await this.alertController.create({
      header: "Vous n'avez plus de diamands",
      message: '',
      buttons: ['OK']
    });

    await alert.present();
  }

  async win() {

    const modal = await this.modalController.create({
      component: WinComponent,
      componentProps: {
        theme: this.quizz.category_name
      },
      cssClass: 'ask-ad-custom',
      backdropDismiss: false
    });

    return await modal.present();

  }

  UpdateScore(theme: number): any {

    let response = this.db.executeSqlQuery(
      `
        UPDATE
          categories
        SET
          score = score + 1
        WHERE
          id = ${theme}
      ;`,
      []
    );

  }

  public refreshCounter(): any {
    this.db.getWonCounter(this.quizz.category_name);    
  }

  async ad(theme: string, time: number) {

    const modal = await this.modalController.create({
      component: AdvertisementComponent,
      componentProps: {
        theme: theme,
        time: time
      },
      cssClass: 'ask-ad-custom',
      backdropDismiss: false
    });

    return await modal.present();

  }

  AdIfModuloFive(): any {

    if (this.db.countDone.getValue() !== 0 && (this.db.countDone.getValue() % 5) === 0) {
      this.ad(this.quizz.category_name, 15);
    }

  }

  checkResult(commit: string) {

    if (this.quizz.answer === commit) {

      this.db.changeStatusQuizz(this.quizz.quizz_id, 2);
      this.UpdateScore(this.quizz.category_id);

      // Actualisé la valeur du compteur
      this.db.getWonCounter(this.quizz.category_name);

      // Récupère le prochain quizz de ce thème
      this.db.getQuizzFromLevels(this.quizz.category_name, this.quizz.difficulty_name)
      .then(data => {
        this.nextQuizz = data;

        // Si il reste encore des quizz alors on continue
        if (this.nextQuizz) {
          this.quizz = this.nextQuizz;

          this.AdIfModuloFive();
        }
        else {
          // Popup fin de niveau
          this.win();

          this.db.addDiamonds(2);
          this.db.refreshDiamonds();

          // Redirection vers la page des niveaux
          this.router.navigate(['levels', this.quizz.category_name]);
        }

      });      

    }
    else {

      // this.vibration.vibrate(1000);

      // Status:
        // 0 never done
        // 1 fail
        // 2 done
      this.db.changeStatusQuizz(this.quizz.quizz_id, 1);

      switch (this.db.diamonds.getValue()) {
      
        case 0:
          this.AskAd();
          break;

        default:
          this.fail();
          break;

      }

    }

  }

}
