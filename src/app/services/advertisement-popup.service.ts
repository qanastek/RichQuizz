import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AdvertisementPopupService {

  constructor() { }

  public displayAd(time: number): any {
    if (time === 15) {
      console.log("PUB de 15s");
    } if (time === 30) {
      console.log("PUB de 30s");
    } else {
      
    }
  }
}
