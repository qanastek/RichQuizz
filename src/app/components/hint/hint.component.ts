import { DatabaseService } from 'src/app/services/database.service';
import { PlayService } from './../../services/play.service';
import { AppComponent } from './../../app.component';
import { RouterModule, Router } from '@angular/router';
import { Component, Input, NgZone, OnInit } from '@angular/core';
import { NavParams, ModalController, Platform, NavController  } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { AdMobFreeInterstitialConfig, AdMobFree } from '@ionic-native/admob-free/ngx';

@Component({
  selector: 'app-hint',
  templateUrl: './hint.component.html',
  styleUrls: ['./hint.component.scss'],
})
export class HintComponent implements OnInit {

  private backbuttonSubscription: Subscription;

  @Input('diamonds') diamonds: number = 1;

  constructor(
    public navParams: NavParams,
    public modalCtrl: ModalController,
    private router: Router,
    private platform: Platform,
    private ngZone: NgZone,
    private admob: AdMobFree,
    private plt: Platform,
    public nav: NavController,
    public play: PlayService,
    public db: DatabaseService
  ) { }

  ngOnInit() {
    this.platform.ready().then(() => {

      // Si le user appuie sur le hardware back button
      // alors cela agit comme si il avait choisi l'option non
      this.backbuttonSubscription = this.platform.backButton.subscribeWithPriority(500, async () => {

        const modal = await this.modalCtrl.getTop();

        if (modal) {
          this.goBack();          
        }

      })
      
    });
  }

  ngOnDestroy() {
      this.backbuttonSubscription.unsubscribe();
  }

  async close() {    
    await this.modalCtrl.dismiss();
  }

  getRandomInt(max: number) {
    return Math.floor(Math.random() * Math.floor(max));
  }

  randomLetter() {
    this.db.subDiamonds(1);
    (document.querySelector(".randomLetter") as HTMLElement).style.display = "none";

    let answer = this.play.quizz.answer;
    let answerLen = answer.length;

    let randomNbr = this.getRandomInt(answerLen);
    let letter = answer.charAt(randomNbr);

    this.play.currentSpell[randomNbr] = letter;

    this.play.paidLetters.push(randomNbr);
    
    this.close();
  }

  firstLetter() {
    this.db.subDiamonds(2);
    (document.querySelector(".firstLetter") as HTMLElement).style.display = "none";

    let answer = this.play.quizz.answer;

    this.play.currentSpell[0] = answer.charAt(0);
    this.play.paidLetters.push(0);

    this.close();
  }

  goBack() {
    this.close();
  }

}
