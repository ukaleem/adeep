import { Component, OnInit, Output, ViewChild ,EventEmitter, ElementRef, Input} from '@angular/core';
import { ActionSheetController, Platform, ModalController, NavParams } from '@ionic/angular';
import { Capacitor } from '@capacitor/core';
import { EndpointsService } from 'src/app/services/endpoints.service';
import { LoadingService } from 'src/app/services/loading.service';
import { AlertsService } from 'src/app/services/alerts.service';


@Component({
  selector: 'app-image-picker',
  templateUrl: './image-picker.component.html',
  styleUrls: ['./image-picker.component.scss'],
})
export class ImagePickerComponent implements OnInit {
  @Output() imageSelectedPicker = new EventEmitter<string | File | any>();

  @Input() insertId: string;
  @Input() uploadFrom: string;
  @Input() lastName: string;
  
  @ViewChild('filePiker', {static: false}) filePickerRef: ElementRef<HTMLInputElement>;
  selectedImage: any;
  usePicker = false;
  fileItem:any;

  constructor(private actionSheetController: ActionSheetController,
     
    private modalCtrl:ModalController,
    public navParams : NavParams,
    private api : EndpointsService,
    private loadingLoader: LoadingService,
    private alertService: AlertsService,
    private file: File,
    private plt: Platform) {
    console.log(this.uploadFrom);
    console.log(this.navParams.get('uploadFrom'));
    this.insertId = this.navParams.get('insertId');
    this.uploadFrom = this.navParams.get('uploadFrom');
    this.lastName = this.navParams.get('lastName');
  }

  ngOnInit() {
    console.log('Mobile', this.plt.is('mobile'));
    console.log('hybrid', this.plt.is('hybrid'));
    console.log('ios', this.plt.is('ios'));
    console.log('android', this.plt.is('android'));
    console.log('desktop', this.plt.is('desktop'));
    if ((this.plt.is('mobile') && !this.plt.is('hybrid')) || this.plt.is('desktop') ) {
      this.usePicker = true;
    }
  }

  dismiss(){
    this.modalCtrl.dismiss();
  }
}