import { DatabaseService, Quizz } from './../services/database.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
// import { Vibration } from '@ionic-native/vibration/ngx';
import { AlertController } from '@ionic/angular';
import { BehaviorSubject } from 'rxjs';
import { first, take, last } from 'rxjs/operators';

@Component({
  selector: 'app-play',
  templateUrl: './play.page.html',
  styleUrls: ['./play.page.scss'],
})
export class PlayPage implements OnInit {

  quizz: any = JSON.parse(this.route.snapshot.paramMap.get('quizz'));
  diamonds: BehaviorSubject<number> = new BehaviorSubject(0);
  nextQuizz: any;

  constructor(
    private route: ActivatedRoute,
    public db: DatabaseService,
    private router: Router,
    // private vibration: Vibration,
    public alertController: AlertController
  ) { }

  ngOnInit() {
    this.refreshCounter();
    this.refreshDiamonds()
  }

  async fail() {
    const alert = await this.alertController.create({
      header: 'Retry ?',
      message: 'Do you want to try again ? <strong>cost 1 diamond</strong>',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            this.router.navigate(['levels', this.quizz.category_name]);
          }
        }, {
          text: 'Retry',
          handler: () => {
            this.db.subDiamonds(1);
            this.refreshDiamonds();
          }
        }
      ]
    });

    await alert.present();
  }

  async AskAd() {
    const alert = await this.alertController.create({
      header: 'Retry ?',
      message: 'Do you want to watch a ad for retry ?',
      buttons: [
        {
          text: 'No',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            this.router.navigate(['levels', this.quizz.category_name]);
          }
        }, {
          text: 'Watch',
          handler: () => {
            // 30s ad here
            console.log("Watch 30s AD");
          }
        }
      ]
    });

    await alert.present();
  }

  async dead(answer: string) {

    if (answer == "true") {
      answer = "vrai";
    }
    else if (answer == "false") {
      answer = "faux";
    }

    const alert = await this.alertController.create({
      header: "Vous n'avez plus de diamands",
      subHeader: 'La réponse était ' + answer,
      message: '',
      buttons: ['OK']
    });

    await alert.present();
  }

  async win() {
    const alert = await this.alertController.create({
      header: "Bravo vous avez fini le niveau !",
      subHeader: '',
      message: '',
      buttons: ['OK']
    });

    await alert.present();
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

  public refreshDiamonds(): any {

    this.db.getDiamonds()
    .then(data => {
      this.diamonds.next(data);
    });
    
  }

  public getDiamonObservable(): any {
    return this.diamonds.asObservable();
  }

  public getValueDiamonds(): any {
    return this.getDiamonObservable().subscribe(data => {
      console.log('data');
      console.log(data);
      return data;
    });
  }

  AdIfModuloFive(): any {

    if (this.db.countDone.getValue() !== 0 && (this.db.countDone.getValue() % 5) === 0) {
      console.log("PUB de 15s");
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

          // Apres avoir réussit le level tu prend une pub
          console.log("pub 30s");
          this.db.addDiamonds(2);
          this.refreshDiamonds();

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

      switch (this.diamonds.getValue()) {
      
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
