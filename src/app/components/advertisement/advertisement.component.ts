import { RouterModule, Router } from '@angular/router';
import { Component, Input, NgZone, OnInit } from '@angular/core';
import { NavParams, ModalController, Platform  } from '@ionic/angular';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-advertisement',
  templateUrl: './advertisement.component.html',
  styleUrls: ['./advertisement.component.scss'],
})
export class AdvertisementComponent implements OnInit {

  private backbuttonSubscription: Subscription;
  
  @Input() theme: string;
  @Input() time: number;

  constructor(
    public navParams: NavParams,
    public modalCtrl: ModalController,
    private router: Router,
    private platform: Platform,
    private ngZone: NgZone
  ) { }

  ngOnInit() {

    // Auto close the ad
    this.autoClosing();

    this.platform.ready().then(() => {

      // Si le user appuie sur le hardware back button
      // alors cela agit comme si il avait choisi l'option non
      this.backbuttonSubscription = this.platform.backButton.subscribeWithPriority(500, async () => {

        const modal = await this.modalCtrl.getTop();

        if (modal) {
          console.error("Cant skip the ad.");
        }

      })
      
    });
  }

  ngOnDestroy() {
    this.backbuttonSubscription.unsubscribe();
  }

  async close() {
    const modal = await this.modalCtrl.getTop();
    return await modal.dismiss();
  }

  async autoClosing() {
    setTimeout(() => {
      this.close();
    }, this.time * 1000);
  }

}
