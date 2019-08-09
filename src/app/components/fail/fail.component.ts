import { RouterModule, Router } from '@angular/router';
import { Component, Input, NgZone } from '@angular/core';
import { NavParams, ModalController, Platform  } from '@ionic/angular';
import { DatabaseService } from 'src/app/services/database.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-fail',
  templateUrl: './fail.component.html',
  styleUrls: ['./fail.component.scss'],
})
export class FailComponent {
  
  private backbuttonSubscription: Subscription;
  
  @Input() theme: string;

  constructor(
    public navParams: NavParams,
    public modalCtrl: ModalController,
    private router: Router,
    private platform: Platform,
    private ngZone: NgZone,
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

  async close () {
    await this.modalCtrl.dismiss();
  }

  goBack() {
    this.close();
    this.ngZone.run(() => this.router.navigate(['levels', this.theme]));
  }

  pay() {
    this.db.subDiamonds(1);
    this.db.refreshDiamonds();
    this.close();
  }

}
