import { FailComponent } from './../components/fail/fail.component';
import { AskAdComponent } from './../components/ask-ad/ask-ad.component';
import { DatabaseService, Quizz } from './../services/database.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
// import { Vibration } from '@ionic-native/vibration/ngx';
import { AlertController, ModalController, NavController } from '@ionic/angular';
import { BehaviorSubject } from 'rxjs';
import { AdvertisementComponent } from '../components/advertisement/advertisement.component';
// import { AdMobFree, AdMobFreeInterstitial } from '@ionic-native/admob-free/ngx';
import { AdMobFree, AdMobFreeInterstitialConfig, AdMobFreeBannerConfig } from '@ionic-native/admob-free/ngx';

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
    public modalController: ModalController,
    private admob: AdMobFree,
    public navCtrl: NavController
  ) { }

  ngOnInit() {
    this.ShowAdBanner();
    this.refreshCounter();
    this.db.refreshDiamonds();
  }

  ngOnDestroy() {
    this.admob.banner.remove();    
  }

  async fail() {

    // animated: true,
    // keyboardClose: true,
    // showBackdrop: false,

    const modal = await this.modalController.create({
      component: FailComponent,
      componentProps: {},
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
      componentProps: {},
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

  public refreshCounter(): any {
    this.db.getWonCounter();    
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

    if (this.db.countDone.getValue() !== 0 && (this.db.countDone.getValue() % this.db.ads.android.AD_DELAY) === 0) { 
      this.InterstitielAdvertisement();
    }

  }

  ShowAdBanner() {
    
    // id: 'ca-app-pub-7311596904113357/2316579562',
    const bannerConfig: AdMobFreeBannerConfig = {
      isTesting: true,
      autoShow: true,
    };
    this.admob.banner.config(bannerConfig);
     
    this.admob.banner.prepare()
    .then(() => {
      
    })
    .catch(e => console.log(e));
  }

  async InterstitielAdvertisement() {

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
      // this.admob.interstitial.prepare()
      // .then(() => {
      //   console.log("Interstitial CLOSE");
      // })
      // .catch(e => console.error(e));
      
      console.log("Interstitial CLOSE");
    });

  }

  checkResult(commit: string) {

    if (this.quizz.answer === commit) {

      this.db.changeStatusQuizz(this.quizz.quizz_id, 2);

      // Vérifie si on vient de validé une quête
      this.db.checkQuests();

      // Reload l'état des défis
      this.db.reloadQuests();

      // Actualisé la valeur du compteur
      this.db.getWonCounter();

      // update the score of the level
      this.db.updateWon(this.quizz.difficulty_name);

      // Récupère le prochain quizz de ce thème
      this.db.getQuizzFromLevels(this.quizz.difficulty_name)
      .then(data => {
        this.nextQuizz = data;

        // Si il reste encore des quizz alors on continue
        if (this.nextQuizz) {
          // Load the next quizz
          this.quizz = this.nextQuizz;

          // Launch an ad if mod 5
          this.AdIfModuloFive();

          this.db.DoneCountLevels();
        }
        else {
          // Popup fin de niveau
          
          this.InterstitielAdvertisement();

          this.db.addDiamonds(2);
          this.db.refreshDiamonds();

          this.db.DoneCountLevels();

          // Redirection vers la page des niveaux
          this.router.navigate(['levels']);
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

      this.db.DoneCountLevels();

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
