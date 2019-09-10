import { PlayService } from './../services/play.service';
import { HintComponent } from './../components/hint/hint.component';
import { EndLevelComponent } from './../components/end-level/end-level.component';
import { Quizz } from './../interfaces/quizz';
import { FailComponent } from './../components/fail/fail.component';
import { AskAdComponent } from './../components/ask-ad/ask-ad.component';
import { DatabaseService } from './../services/database.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
// import { Vibration } from '@ionic-native/vibration/ngx';
import { AlertController, ModalController, NavController } from '@ionic/angular';
import { BehaviorSubject } from 'rxjs';
import { AdvertisementComponent } from '../components/advertisement/advertisement.component';
// import { AdMobFree, AdMobFreeInterstitial } from '@ionic-native/admob-free/ngx';
import { AdMobFree, AdMobFreeInterstitialConfig, AdMobFreeBannerConfig } from '@ionic-native/admob-free/ngx';

@Component({
  selector: 'app-play',
  templateUrl: './play.page.html',
  styleUrls: ['./play.page.scss'],
})
export class PlayPage implements OnInit {

  constructor(
    private route: ActivatedRoute,
    public db: DatabaseService,
    private router: Router,
    // private vibration: Vibration,
    public alertController: AlertController,
    public modalController: ModalController,
    private admob: AdMobFree,
    public navCtrl: NavController,
    public play: PlayService
  ) { }

  ngOnInit() {

    // Asign received quizz to the service
    this.play.quizz = JSON.parse(this.route.snapshot.paramMap.get('quizz'));

    this.ShowAdBanner();
    this.refreshCounter();
    this.db.refreshDiamonds();

    if (this.play.quizz.type_id === 2) {
      this.makeSpellLetters(this.play.quizz.answer);
    }
  }

  ngOnDestroy() {
    this.admob.banner.remove();    
  }

  async fail() {

    // animated: true,
    // keyboardClose: true,
    // showBackdrop: false,

    const modal = await this.modalController.create({
      component: FailComponent,
      componentProps: {},
      cssClass: 'ask-ad-custom',
      backdropDismiss: false
    });

    return await modal.present();
  }

  async AskAd() {

    // animated: true,
    // keyboardClose: true,
    // showBackdrop: false,

    const modal = await this.modalController.create({
      component: AskAdComponent,
      componentProps: {},
      cssClass: 'ask-ad-custom',
      backdropDismiss: false
    });

    return await modal.present();
  }

  async EndLevelPopup(diamonds: number) {

    // animated: true,
    // keyboardClose: true,
    // showBackdrop: false,

    const modal = await this.modalController.create({
      component: EndLevelComponent,
      componentProps: {
        diamonds: diamonds
      },
      cssClass: 'ask-ad-custom',
      backdropDismiss: false
    });

    return await modal.present();
  }

  async Indices() {

    const modal = await this.modalController.create({
      component: HintComponent,
      componentProps: {},
      cssClass: 'ask-ad-custom',
      backdropDismiss: false
    });

    return await modal.present();
  }

  async dead(answer: string) {

    const alert = await this.alertController.create({
      header: "Vous n'avez plus de diamands",
      message: '',
      buttons: ['OK']
    });

    await alert.present();
  }

  public refreshCounter(): any {
    this.db.getWonCounter();    
  }

  async ad(theme: string, time: number) {

    const modal = await this.modalController.create({
      component: AdvertisementComponent,
      componentProps: {
        theme: theme,
        time: time
      },
      cssClass: 'ask-ad-custom',
      backdropDismiss: false
    });

    return await modal.present();

  }

  AdIfModuloFive(): any {

    if (this.db.countDone.getValue() !== 0 && (this.db.countDone.getValue() % this.db.ads.android.AD_DELAY) === 0) { 
      this.InterstitielAdvertisement();
    }

  }

  ShowAdBanner() {
    
    // id: 'ca-app-pub-7311596904113357/2316579562',
    const bannerConfig: AdMobFreeBannerConfig = {
      isTesting: true,
      autoShow: true,
    };
    this.admob.banner.config(bannerConfig);
     
    this.admob.banner.prepare()
    .then(() => {
      
    })
    .catch(e => console.log(e));
  }

  async InterstitielAdvertisement() {

    // id: 'ca-app-pub-7311596904113357/3034587257',
    const InterstitielConfig: AdMobFreeInterstitialConfig = {
      isTesting: true,
      autoShow: true,
    };
    this.admob.interstitial.config(InterstitielConfig);
     
    this.admob.interstitial.prepare()
    .then(() => {
      console.log("Interstitial OPEN");      
    })
    .catch(e => console.log(e));

    this.admob.on('admob.interstitial.events.CLOSE').subscribe(() => {      
      console.log("Interstitial CLOSE");
    });

  }

  async InterstitielAdvertisementEndLevel() {

    // id: 'ca-app-pub-7311596904113357/3034587257',
    const InterstitielConfig: AdMobFreeInterstitialConfig = {
      isTesting: true,
      autoShow: true,
    };
    this.admob.interstitial.config(InterstitielConfig);
     
    this.admob.interstitial.prepare()
    .then(() => {
      console.log("Interstitial OPEN");      
    })
    .catch(e => console.log(e));

    this.admob.on('admob.interstitial.events.CLOSE').subscribe(() => {      
      console.log("Interstitial CLOSE");
    });

  }

  setCharAt(str,index,chr) {
    if(index > str.length-1) return str;
    return str.substr(0,index) + chr + str.substr(index+1);
  }

  addTwoLetters(answer: string): Promise<string> {

    // Ajouter les deux lettres
    var nbrLetters = 2;

    var chars = "abcdefghijklmnopqrstuvwxyz";

    for (let i = 0; i < nbrLetters; i++) {
      answer += chars.charAt(Math.floor(Math.random() * chars.length));
    }

    // Return as promise
    // Renvoie la string avec les deux nouvelles lettres
    return new Promise((resolve, reject) => {
      if (answer) {
        resolve(answer);
      } else {
        reject("Answer empty");
      }
    });

  }
  
  shuffle(a: Array<string>) {
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  usableArray() {
    let array: string[] = [];

    for (let k = 0; k < this.play.quizz.answer.length; k++) {
      array[k] = this.play.currentSpell[k];
    }

    for (let i = 0; i < this.play.quizz.answer.length; i++) {
      if (!array[i]) {
        array[i] = "_";
      }    
    }
    
    return array;
  }

  makeSpellLetters(answer: string): void {

    if (answer) {

      this.addTwoLetters(answer)
      .then(answer0 => {     

        // String to array
        var array: string[] = [];

        for (let k = 0; k < answer0.length; k++) {
          array.push(answer0.charAt(k));     
        }

        this.play.spellArray = this.shuffle(array);

      })
      .catch(e => {
        console.error(e); 
      });
      
    } else {
      console.error("error");      
    }

  }

  // It run a animate.css animation and after that it stop it
  animateCSS(element: string, animationName: string, callback: any) {
    const node = document.querySelector(element);
    node.classList.add('animated', animationName);

    function handleAnimationEnd() {
        node.classList.remove('animated', animationName);
        node.removeEventListener('animationend', handleAnimationEnd);

        if (typeof callback === 'function') callback();
    }

    node.addEventListener('animationend', handleAnimationEnd);
  }

  ArrayToString() {
    let word: string = "";

    this.play.currentSpell.forEach(element => {
      word += element;      
    });

    return word;    
  }

  showIndices() {
    this.Indices();
  }

  haveSpace() {
    if (this.play.currentSpell.length < this.play.quizz.answer.length) return true;

    if (this.play.currentSpell.includes(null)) return true;

    if (this.play.currentSpell.includes(undefined)) return true;
  }

  addSpell(letter: string, id: string): void {

    if(this.haveSpace()) {

      id = "#" + id;

      // Equivalent à hide() de JQuery
      (document.querySelector(id) as HTMLElement).style.display = "none";
      
      // Ajoute l'id du btn dans une array de sorte à pouvoir par la suite le show()
      this.play.deletedLetters.push(id);

      for (let i = 0; i < this.play.quizz.answer.length; i++) { 
               
        if (
          !this.play.currentSpell[i] ||
          this.play.currentSpell[i] === undefined ||
          this.play.currentSpell[i] === null
        ) {
          this.play.currentSpell[i] = letter;

          return;
        }
      }

    }
  }

  clearSpell(): void {

    // Analyse tout l'array actuelle dans le sens inverse
    for (let i = this.play.currentSpell.length - 1; i >= 0; i--) {

      // Si la case n'est pas vide et que celle-ci n'est pas une lettre acheté      
      if (this.play.currentSpell[i] && !this.play.paidLetters.includes(i)) {

        // Vidé la case mais la gardé
        this.play.currentSpell[i] = undefined;
        
        // Obtenir l'ID de la prochaine lettre à supprimé
        var id = this.play.deletedLetters.pop();
    
        // Equivalent à show() de JQuery
        (document.querySelector(id) as HTMLElement).style.display = "block";

        // Arrête la procédure de supréssion
        return;        
      }
      
    }
  }

  checkResult(commit: string) {

    // Si il s'agit de la bonne réponse
    if (this.play.quizz.answer === commit) {

      // Change le statut du current quizz pour réussit
      this.db.changeStatusQuizz(this.play.quizz.quizz_id, 2);

      // Vérifie si on vient de validé une quête
      this.db.checkQuests();

      // Reload l'état des défis
      this.db.reloadQuests();

      // Actualisé la valeur du compteur
      this.db.getWonCounter();

      // update the score of the level
      this.db.updateWon(this.play.quizz.difficulty_name);

      // Récupère le prochain quizz de ce thème
      this.db.getQuizzFromLevels(this.play.quizz.difficulty_name)
      .then(data => {
        this.play.nextQuizz = data;

        // Si il reste encore des quizz alors on continue
        if (this.play.nextQuizz) {

          // Load the next quizz
          this.play.quizz = this.play.nextQuizz;

          // Launch an ad if mod 5
          this.AdIfModuloFive();

          // Actualise les valeurs des levels
          this.db.DoneCountLevels();
        }
        else {

          // Inter fin de niveau
          this.InterstitielAdvertisementEndLevel();

          // Popup de fin de niveau qui montre que le joueur viens de gagner 2 diamands
          this.EndLevelPopup(2);

          // Give les 2 diamands de fin de niveau
          this.db.addDiamonds(2);

          // Actualise les valeurs des levels
          this.db.DoneCountLevels();

          // Redirection vers la page des niveaux
          this.router.navigate(['levels']);
        }

      });      

    }
    else {

      // this.vibration.vibrate(1000);

      // Status:
        // 0 never done
        // 1 fail
        // 2 done
      this.db.changeStatusQuizz(this.play.quizz.quizz_id, 1);

      this.db.DoneCountLevels();

      switch (this.db.diamonds.getValue()) {
      
        case 0:
          this.AskAd();
          break;

        default:
          this.fail();
          break;

      }

    }

  }

}
