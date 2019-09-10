import { RouterModule, Router } from '@angular/router';
import { Component, Input, NgZone, OnInit } from '@angular/core';
import { NavParams, ModalController, Platform  } from '@ionic/angular';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-no-money',
  templateUrl: './no-money.component.html',
  styleUrls: ['./no-money.component.scss'],
})
export class NoMoneyComponent implements OnInit {

  private backbuttonSubscription: Subscription;

  constructor(
    public navParams: NavParams,
    public modalCtrl: ModalController,
    private router: Router,
    private platform: Platform,
    private ngZone: NgZone
  ) { }

  ngOnInit() {
    this.platform.ready().then(() => {

      // Si le user appuie sur le hardware back button
      // alors cela agit comme si il avait choisi l'option non
      this.backbuttonSubscription = this.platform.backButton.subscribeWithPriority(500, async () => {

        const modal = await this.modalCtrl.getTop();

        if (modal) {
          this.close();
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

}
