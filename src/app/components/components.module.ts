import { AskAdComponent } from './ask-ad/ask-ad.component';
import { NgModule } from '@angular/core';
import { ProgressionBarComponent } from './progression-bar/progression-bar.component';
import { ThemeBarComponent } from './theme-bar/theme-bar.component';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

@NgModule({
  declarations: [ProgressionBarComponent, ThemeBarComponent, AskAdComponent],
  imports: [CommonModule, IonicModule],
  exports: [ProgressionBarComponent, ThemeBarComponent, AskAdComponent],
  entryComponents: [
    AskAdComponent
  ]
})
export class ComponentsModule { }
