import { Injectable } from '@angular/core';
import { LoadingController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  static loading;

  constructor(private loadingCtrl: LoadingController) {
    LoadingService.loading =  this.loadingCtrl.create({
      spinner: 'bubbles',
      message: 'Please wait...',
    //  translucent: true,
    });
   }

  async prsentLoading() {
    (await LoadingService.loading).present();
  }

  async closeLoading() {
    (await LoadingService.loading).dismiss();
  }
}
