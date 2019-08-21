import { AppComponent } from './../../app.component';
import { RouterModule, Router } from '@angular/router';
import { Component, Input, NgZone, OnInit } from '@angular/core';
import { NavParams, ModalController, Platform, NavController  } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { AdMobFreeInterstitialConfig, AdMobFree } from '@ionic-native/admob-free/ngx';

@Component({
  selector: 'app-ask-ad',
  templateUrl: './ask-ad.component.html',
  styleUrls: ['./ask-ad.component.scss'],
})
export class AskAdComponent {

  private backbuttonSubscription: Subscription;

  constructor(
    public navParams: NavParams,
    public modalCtrl: ModalController,
    private router: Router,
    private platform: Platform,
    private ngZone: NgZone,
    private admob: AdMobFree,
    private plt: Platform,
    public nav: NavController
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

  async close () {    
    await this.modalCtrl.dismiss();
  }

  InterstitielAdvertisement() {

    this.plt.ready().then( () => {

      const cfg: AdMobFreeInterstitialConfig = {
        // id: 'ca-app-pub-7311596904113357/3034587257',
        isTesting: true,
        autoShow: true,
      };
      this.admob.interstitial.config(cfg);
      
      this.admob.interstitial.prepare().then(() => {

      });
      
    } );

  }

  lookAd() {
    this.close();
    this.InterstitielAdvertisement();    
  }

  goBack() {
    this.close();
    this.ngZone.run(() => this.router.navigate(['levels']));
  }

}
