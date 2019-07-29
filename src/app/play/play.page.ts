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
  hearths: string = "♥♥♥";
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
      header: 'Vous avez perdu une ♥',
      subHeader: '',
      message: '',
      buttons: ['OK']
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
      header: "Vous n'avez plus de vies",
      subHeader: 'La réponse était ' + answer,
      message: '',
      buttons: ['OK']
    });

    await alert.present();
  }

  async win() {
    const alert = await this.alertController.create({
      header: "Bravo !",
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

      // Popup window for winning
      this.win();

      this.db.changeStatusQuizz(this.quizz.quizz_id, 2);
      this.UpdateScore(this.quizz.category_id);

      // Récupère le prochain quizz de ce thème
      this.db.getQuizzTheme(this.quizz.category_name)
      .then(data => {
        this.nextQuizz = data;

        // Si il reste encore des quizz alors on continue
        if (this.nextQuizz) {
          this.quizz = this.nextQuizz;
        }
        else {        
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

        case '♥♥♥':
          this.fail();
          this.hearths = "♥♥";
          break;
        
        case '♥♥':
          this.fail();
          this.hearths = "♥";
          break;
        
        case '♥':
          this.dead(this.quizz.answer);
          // this.scoresSession = 0;
          this.router.navigate(['themes']);
          break;

      }

    }

  }

}
