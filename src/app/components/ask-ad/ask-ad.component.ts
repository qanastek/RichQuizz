import { RouterModule, Router } from '@angular/router';
import { Component, Input, NgZone } from '@angular/core';
import { NavParams, ModalController, Platform  } from '@ionic/angular';

@Component({
  selector: 'app-ask-ad',
  templateUrl: './ask-ad.component.html',
  styleUrls: ['./ask-ad.component.scss'],
})
export class AskAdComponent {

  @Input() theme: string;

  constructor(
    public navParams: NavParams,
    public modalCtrl: ModalController,
    private router: Router,
    private platform: Platform,
    private ngZone: NgZone
  ) {
    platform.ready().then(() => {

      // Si le user appuie sur le hardware back button
      // alors cela agit comme si il avait choisi l'option non
      this.platform.backButton.subscribeWithPriority(500, () => {
        this.goBack();
      })
      
    });
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
