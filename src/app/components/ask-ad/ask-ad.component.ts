import { AppComponent } from './../../app.component';
import { RouterModule, Router } from '@angular/router';
import { Component, Input, NgZone, OnInit } from '@angular/core';
import { NavParams, ModalController, Platform, NavController  } from '@ionic/angular';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-ask-ad',
  templateUrl: './ask-ad.component.html',
  styleUrls: ['./ask-ad.component.scss'],
})
export class AskAdComponent {

  private backbuttonSubscription: Subscription;

  @Input() theme: string;

  constructor(
    public navParams: NavParams,
    public modalCtrl: ModalController,
    private router: Router,
    private platform: Platform,
    private ngZone: NgZone,
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

  lookAd() {
    this.close();
    console.log("Watch 30s AD");
  }

  goBack() {
    this.close();
    this.ngZone.run(() => this.router.navigate(['levels', this.theme]));
  }

}
