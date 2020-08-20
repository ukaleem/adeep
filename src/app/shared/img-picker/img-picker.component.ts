import { Component, OnInit, PlatformRef } from '@angular/core';
import { ActionSheetController, Platform, ModalController, LoadingController } from '@ionic/angular';
import { AlertsService } from 'src/app/services/alerts.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-img-picker',
  templateUrl: './img-picker.component.html',
  styleUrls: ['./img-picker.component.scss'],
})
export class ImgPickerComponent implements OnInit {

  STORAGE_KEY = 'IMAGES'
  constructor(
    private actionSheetController: ActionSheetController,
    private plt: Platform,
    private modalCtrl: ModalController,
    private file: File,
    private alertService: AlertsService,
    private loadingController: LoadingController,
    private http: HttpClient,
  ) { }

  images: any = []
  ngOnInit() { }

  closeModal() {
    this.modalCtrl.dismiss();
  }
}
