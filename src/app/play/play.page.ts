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
  scoresSession: number = 0;
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

  UpdateScore(theme: number, score: number): any {

    this.scoresSession += score;

    let response = this.db.executeSqlUpdate(
      `
        UPDATE
          categories
        SET
          score = score + ${score}
        WHERE
          id = ${theme}
      ;`,
      []
    );

  }

  checkResult(
    quizzId: number,
    answer: string,
    commit: string,
    themeId: number,
    themeName: string,
    scoreDifficulty: number
  ) {

    if (answer === commit) {
      // Popup window for winning
      this.win();

      this.db.changeStatusQuizz(quizzId, 2);
      this.UpdateScore(themeId, scoreDifficulty);

      // Récupère le prochain quizz de ce thème
      this.db.getQuizzTheme(themeName)
      .then(data => {
        this.nextQuizz = data;

        // Si il reste encore des quizz alors on continue
        if (this.nextQuizz) {
          this.quizz = this.nextQuizz;
        }
        else {        
          this.router.navigate(['themes']);
        }

      });      

    }
    else {

      // this.vibration.vibrate(1000);

      // Status:
        // 0 never done
        // 1 fail
        // 2 done
      this.db.changeStatusQuizz(quizzId, 1);

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
          this.dead(answer);
          // this.scoresSession = 0;
          this.router.navigate(['themes']);
          break;

      }

    }

  }

}
