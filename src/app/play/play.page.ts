import { DatabaseService, Quizz } from './../services/database.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
// import { Vibration } from '@ionic-native/vibration/ngx';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-play',
  templateUrl: './play.page.html',
  styleUrls: ['./play.page.scss'],
})
export class PlayPage implements OnInit {

  quizz: any;
  hearths: number = 5;
  nextQuizz: any;

  constructor(
    private route: ActivatedRoute,
    private db: DatabaseService,
    private router: Router,
    // private vibration: Vibration,
    public alertController: AlertController
  ) { }

  ngOnInit() {
    // Transforme la string reçu en paramètre en JSON
    this.quizz = JSON.parse(this.route.snapshot.paramMap.get('quizz'));
  }

  useJocker() {
    
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
            this.hearths -= 1;
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

    let response = this.db.executeSqlUpdate(
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

  checkResult(commit: string) {

    if (this.quizz.answer === commit) {

      // Update the counter of wons
      // this.levels.refreshCounter();

      this.db.changeStatusQuizz(this.quizz.quizz_id, 2);
      this.UpdateScore(this.quizz.category_id);

      // Récupère le prochain quizz de ce thème
      this.db.getQuizzFromLevels(this.quizz.category_name, this.quizz.difficulty_name)
      .then(data => {
        this.nextQuizz = data;

        // Si il reste encore des quizz alors on continue
        if (this.nextQuizz) {
          this.quizz = this.nextQuizz;

          // Si modulo(counter_done, 5) === 0 alors lancé une pub
        }
        else {
          // Popup fin de niveau
          this.win();

          // Apres avoir réussit le level tu prend une pub
          // et gagne 2 diamands

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

      switch (this.hearths) {

        case 5:
        case 4:
        case 3:
        case 2:
        case 1:
          this.fail();
          break;
        
        case 0:
          this.AskAd();
          break;

      }

    }

  }

}
