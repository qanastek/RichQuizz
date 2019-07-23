import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', loadChildren: './home/home.module#HomePageModule' },
  { path: 'themes', loadChildren: './themes/themes.module#ThemesPageModule' },
  { path: 'rules', loadChildren: './rules/rules.module#RulesPageModule' },
  { path: 'scores', loadChildren: './scores/scores.module#ScoresPageModule' },
  { path: 'play/:quizz', loadChildren: './play/play.module#PlayPageModule' },
  { path: 'add', loadChildren: './admin/add/add.module#AddPageModule' },
  { path: 'levels', loadChildren: './levels/levels.module#LevelsPageModule' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
