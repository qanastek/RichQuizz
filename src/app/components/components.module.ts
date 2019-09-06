import { HintComponent } from './hint/hint.component';
import { EndLevelComponent } from './end-level/end-level.component';
import { AdvertisementComponent } from './advertisement/advertisement.component';
import { FailComponent } from './fail/fail.component';
import { AskAdComponent } from './ask-ad/ask-ad.component';
import { NgModule } from '@angular/core';
import { ProgressionBarComponent } from './progression-bar/progression-bar.component';
import { ThemeBarComponent } from './theme-bar/theme-bar.component';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { AdMobFree } from '@ionic-native/admob-free/ngx';

@NgModule({
  declarations: [
    ProgressionBarComponent,
    ThemeBarComponent,
    AskAdComponent,
    FailComponent,
    AdvertisementComponent,
    EndLevelComponent,
    HintComponent
  ],
  imports: [
    CommonModule,
    IonicModule
  ],
  exports: [
    ProgressionBarComponent,
    ThemeBarComponent,
    AskAdComponent,
    FailComponent,
    AdvertisementComponent,
    EndLevelComponent,
    HintComponent
  ],
  entryComponents: [
    AskAdComponent,
    FailComponent,
    AdvertisementComponent,
    EndLevelComponent,
    HintComponent
  ],
  providers: [
    AdMobFree
  ]
})
export class ComponentsModule { }
