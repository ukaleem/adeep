import { Injectable } from '@angular/core';
import { AlertController, ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root',
})
export class AlertsService {
  constructor(
    private alertController: AlertController,
    private toastController: ToastController
  ) {}

  async showAlertNormal(title, messageOb) {
    const alert = await this.alertController.create({
      header: title,
      // subHeader: 'Subtitle',
      message: messageOb,
      cssClass: 'apiAlert',
      buttons: ['OK'],
    });

    await alert.present();
  }

  async presentToast(message) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
    });
    toast.present();
  }

  async presentToastAlert(
    header: string = 'Title',
    message: string = 'Toast message',
    type: string = 'primary',
    time: number = 2000
  ) {
    const toast = await this.toastController.create({
      message,
      header,
      color: type,
      duration: time,
    });
    toast.present();
  }
}
