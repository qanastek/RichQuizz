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

  ShowAdBanner() {
    const bannerConfig: AdMobFreeBannerConfig = {
      isTesting: true,
      autoShow: true,
      size: "SMART_BANNER",
     };
     this.admob.banner.config(bannerConfig);
     
     this.admob.banner.prepare()
       .then(() => {
         
       })
       .catch(e => console.log(e));
  }

  InterstitielAdvertisement() {

    const config: AdMobFreeInterstitialConfig = {
      // id: 'ca-app-pub-7311596904113357/3034587257',
      isTesting: true,
      autoShow: true,
    };
    this.admob.interstitial.config(config);
     
    this.admob.interstitial.prepare()
    .then(() => {
      
    })
    .catch(e => console.log(e));

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
          this.InterstitielAdvertisement();

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
