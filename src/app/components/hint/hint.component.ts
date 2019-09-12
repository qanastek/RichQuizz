import { NoMoneyComponent } from './../no-money/no-money.component';
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
  
  async noEnoughtMoney() {

    const modal = await this.modalCtrl.create({
      component: NoMoneyComponent,
      componentProps: {},
      cssClass: 'ask-ad-custom',
      backdropDismiss: false
    });

    return await modal.present();

  }

  randomLetter() {
    if (this.db.diamonds.getValue() >= 1) {

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
    else {
      this.noEnoughtMoney();
    }
  }

  clearFakes() {

    // Récupère les lettres disponibles
    let givenLetters = this.play.spellArray;

    // Réponse au quizz actuelle
    let answer = this.play.quizz.answer;

    // Pour chaque lettre donnez
    givenLetters.forEach(givenLetter => {

      // Vérifier si elle est comprise dans le mot
      if (!answer.includes(givenLetter)) {

        // Récupéré l'index de cette lettre en trop
        let index = givenLetters.indexOf(givenLetter);  

        // Id de la lettre en trop à hide
        let id = "#letter-" + givenLetter + index;

        // Cache cette lettre
        (document.querySelector(id) as HTMLElement).style.display = "none";
      }     

    });

  }

  deleteUseLessLetters(free: boolean) {

    // Si le joueur peu payer
    if (free !== true && this.db.diamonds.getValue() >= 3) {

      // Enlève 3 diamands
      this.db.subDiamonds(3);

      // Cache le boutton ou les disable
      (document.querySelector(".uselessLetter") as HTMLElement).style.display = "none";
      
      this.clearFakes();
      
      this.close();      
    }
    else if(free === true) {

      // Cache le boutton ou les disable
      (document.querySelector(".uselessLetter") as HTMLElement).style.display = "none";

      this.clearFakes();
      
      this.close();
    }
    else {
      this.noEnoughtMoney();
    }
  }

  async deleteUseLessLettersAd() {

    // id: 'ca-app-pub-7311596904113357/3034587257',
    const InterstitielConfig: AdMobFreeInterstitialConfig = {
      isTesting: true,
      autoShow: true,
    };
    this.admob.interstitial.config(InterstitielConfig);
     
    this.admob.interstitial.prepare()
    .then(() => {
      console.log("Interstitial OPEN");      
    })
    .catch(e => console.log(e));

    this.admob.on('admob.interstitial.events.CLOSE').subscribe(() => {      
      console.log("Interstitial CLOSE");
      this.deleteUseLessLetters(true);
    });

  }

  firstLetter() {
    if (this.db.diamonds.getValue() >= 1) {
      this.db.subDiamonds(2);
      (document.querySelector(".firstLetter") as HTMLElement).style.display = "none";

      let answer = this.play.quizz.answer;

      this.play.currentSpell[0] = answer.charAt(0);
      this.play.paidLetters.push(0);

      this.close();
    } else {  
      this.noEnoughtMoney();      
    }
  }

  goBack() {
    this.close();
  }

}
