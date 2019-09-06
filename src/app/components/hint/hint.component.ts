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

  async close() {    
    await this.modalCtrl.dismiss();
  }

  goBack() {
    this.close();
  }

}
