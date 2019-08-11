import { AdvertisementPopupService } from './../../services/advertisement-popup.service';
import { RouterModule, Router } from '@angular/router';
import { Component, Input, NgZone, OnInit } from '@angular/core';
import { NavParams, ModalController, Platform  } from '@ionic/angular';
import { DatabaseService } from 'src/app/services/database.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-win',
  templateUrl: './win.component.html',
  styleUrls: ['./win.component.scss'],
})
export class WinComponent implements OnInit {

  private backbuttonSubscription: Subscription;
  
  @Input() theme: string;

  constructor(
    public navParams: NavParams,
    public modalCtrl: ModalController,
    private router: Router,
    private platform: Platform,
    private ngZone: NgZone,
    public db: DatabaseService,
    public ad: AdvertisementPopupService
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

  goBack() {
    this.ad.displayAd(30);
    this.close();
    this.ngZone.run(() => this.router.navigate(['levels', this.theme]));
  }

}
