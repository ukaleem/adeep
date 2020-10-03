import { Injectable } from '@angular/core';
import { LoadingController, ModalController } from '@ionic/angular';
import { CustomLoaderComponent } from '../shared/custom-loader/custom-loader.component';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  static loading;
  loader:any;

  constructor(private loadingCtrl: LoadingController,private modelCtrl: ModalController) {
    LoadingService.loading =  this.loadingCtrl.create({
      spinner: 'bubbles',
      message: 'Please wait...',
    //  translucent: true,
    });
   }

  async prsentLoading() {

    // this.loader = await this.modelCtrl.create({
    //   component: CustomLoaderComponent,
    //   cssClass: 'my-custom-class'
    // });
    // return await this.loader.present();

    let xyz = this.modelCtrl.getTop();
    console.log('topModel',xyz);
    this.loader = await this.modelCtrl.create({
      component: CustomLoaderComponent,
      cssClass: 'my_loader_custom',
      keyboardClose : false,
      id: 'loadingModal12'
    });
    return await this.loader.present();
    // (await LoadingService.loading).present();
  }

  async closeLoading() {

    // this.modelCtrl.dismiss();

    this.loader.dismiss();
    this.modelCtrl.dismiss(null,'','loadingModal12');
    // (await LoadingService.loading).dismiss();
  }
}
