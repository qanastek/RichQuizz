import { AdvertisementComponent } from './advertisement/advertisement.component';
import { WinComponent } from './win/win.component';
import { FailComponent } from './fail/fail.component';
import { AskAdComponent } from './ask-ad/ask-ad.component';
import { NgModule } from '@angular/core';
import { ProgressionBarComponent } from './progression-bar/progression-bar.component';
import { ThemeBarComponent } from './theme-bar/theme-bar.component';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

@NgModule({
  declarations: [
    ProgressionBarComponent,
    ThemeBarComponent,
    AskAdComponent,
    FailComponent,
    WinComponent,
    AdvertisementComponent
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
    WinComponent,
    AdvertisementComponent
  ],
  entryComponents: [
    AskAdComponent,
    FailComponent,
    WinComponent,
    AdvertisementComponent
  ]
})
export class ComponentsModule { }
