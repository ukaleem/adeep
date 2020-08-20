import { Injectable } from '@angular/core';
import { AlertController, ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class AlertsService {

  constructor(private alertController: AlertController , private toastController: ToastController) { }

  async showAlertNormal(title, messageOb) {
    const alert = await this.alertController.create({
      header: title,
      // subHeader: 'Subtitle',
      message: messageOb,
      buttons: ['OK']
    });

    await alert.present();
  }

  async presentToast(message) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000
    });
    toast.present();
  }
}
