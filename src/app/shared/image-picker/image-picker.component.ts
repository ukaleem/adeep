import { Component, OnInit, Output, ViewChild ,EventEmitter, ElementRef, Input} from '@angular/core';
import { ActionSheetController, Platform, ModalController, NavParams } from '@ionic/angular';
import { Capacitor } from '@capacitor/core';
import { FilePath } from '@ionic-native/file-path/ngx';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { EndpointsService } from 'src/app/services/endpoints.service';
import { LoadingService } from 'src/app/services/loading.service';
import { AlertsService } from 'src/app/services/alerts.service';
import { File } from "@ionic-native/file/ngx";
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer/ngx';


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
     private filePath: FilePath,
     private camera: Camera,
    private modalCtrl:ModalController,
    public navParams : NavParams,
    private api : EndpointsService,
    private transfer: FileTransfer,
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

  // Create actionsheet to give chooise camera|media library
  async onPickImage() {
    // this.modalCtrl.create({com});
    // tslint:disable-next-line: max-line-length
    const actionSheet = await this.actionSheetController.create({
      header: 'Select Image source',
      buttons: [
        {
          text: 'Load from Library',
          handler: () => {
            // this.cropUpload();
            this.pickImageByLibrary();
          },
        },
        {
          text: 'Use Camera',
          handler: () => {
            this.pickImageByCamera();
          },
        },
        {
          text: 'Cancel',
          role: 'cancel',
        },
      ],
    });
    await actionSheet.present();
  }

  pickImageByLibrary() {
    if (!Capacitor.isPluginAvailable('camera') && this.usePicker) {
      this.filePickerRef.nativeElement.click();
      return;
    }
    const options: CameraOptions = {
      quality: 50,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY
    };

    this.camera.getPicture(options).then(
      imageData => {

        let filename = imageData.substring(imageData.lastIndexOf("/") + 1);
        let path = imageData.substring(0, imageData.lastIndexOf("/") + 1);
        console.log("path", path);
        console.log("filename", filename);
        //then use the method reasDataURL  btw. var_picture is ur image variable
        this.file
          .readAsDataURL(path, filename)
          .then(res => {
            this.selectedImage = res;
            console.log("filename", this.selectedImage);
          });

        this.filePath
          .resolveNativePath(imageData)
          .then(filePath => {
            //this.selectedImage = '../../../assets/images/no-preview.jpg';
            let fileItem = {
              pathUri: filePath,
              fileName: filePath.substr(filePath.lastIndexOf("/") + 1),
              fileType: "file",
              uploadStatus: 1
            };
            this.fileItem = fileItem;
            this.imageSelectedPicker.emit(fileItem);
          })
          .catch(err => console.log(err));
      },
      err => {
        console.log(err);
      }
    );
  }
  pickImageByCamera() {
    if (!Capacitor.isPluginAvailable('camera') && this.usePicker) {
      this.filePickerRef.nativeElement.click();
      return;
    }

    const options: CameraOptions = {
      quality: 50,
      destinationType: this.camera.DestinationType.FILE_URI,
      mediaType: this.camera.MediaType.PICTURE
    };
    this.camera.getPicture(options).then(

      
      imageData => {
        let filename = imageData.substring(imageData.lastIndexOf("/") + 1);
        let path = imageData.substring(0, imageData.lastIndexOf("/") + 1);
        console.log("path", path);
        console.log("filename", filename);
        //then use the method reasDataURL  btw. var_picture is ur image variable
        this.file
          .readAsDataURL(path, filename)
          .then(res => {
            this.selectedImage = res;
            console.log("filename", this.selectedImage);
            
          })


        this.filePath
          .resolveNativePath(imageData)
          .then(filePath => {
           // this.selectedImage = '../../../assets/images/no-preview.jpg';
            let fileItem = {
              pathUri: filePath,
              fileName: filePath.substr(filePath.lastIndexOf("/") + 1),
              fileType: "img",
              uploadStatus: 1
            };
            this.fileItem = fileItem;
            this.imageSelectedPicker.emit(fileItem);
          })
          .catch(err => console.log(err));
      },
      err => {
        alert("error " + JSON.stringify(err));

      }
    );
  }

  // if we are not on native device the file chosen method implement
  onFileChosen(event: Event) {
    const pickedFile = (event.target as HTMLInputElement).files[0];
    if (!pickedFile) {
      return;
    }
    const fr = new FileReader();
    fr.onload = () => {
      const dataUrl = fr.result.toString();
      this.selectedImage = dataUrl;
    };
    fr.readAsDataURL(pickedFile);
    this.imageSelectedPicker.emit(pickedFile);
    console.log(event);
  }


  uploadFileStart() {
    let options: FileUploadOptions ;

    let uploadUrl = '';

    if(this.uploadFrom === 'rt'){


      let stcks= {
        name : this.fileItem.fileName,
        path: this.fileItem.pathUri,
        isUpload : false,
        type: 1,
        showImage : this.selectedImage,
      }
      this.modalCtrl.dismiss(stcks , 'ok');
      return;

    }

    if(this.uploadFrom === 'rest'){
      console.log(this.uploadFrom);
      uploadUrl = this.api.UPDATE_USER_IMAGE;

      options = {
        fileKey: "file",
        fileName: this.fileItem.fileName,
        chunkedMode: true,
        params: {
          id: this.insertId,
          name: this.fileItem.fileName,
        },
        mimeType: "image/jpeg",
        headers: {}
      };

    }

    if(this.uploadFrom === 'user'){
      console.log(this.uploadFrom);
      uploadUrl = this.api.UPDATE_USER_IMAGE;

      options = {
        fileKey: "file",
        fileName: this.fileItem.fileName,
        chunkedMode: true,
        params: {
          worker_id: this.insertId,
          name: this.fileItem.fileName,
        },
        mimeType: "image/jpeg",
        headers: {}
      };

    }
   
    
    
    
    const fileTransfer: FileTransferObject = this.transfer.create();
    this.loadingLoader.prsentLoading();
    //ADD_LOG_ATTACHMENT
    fileTransfer
      .upload(this.fileItem.pathUri, uploadUrl, options)
      .then(
        data => {
          this.alertService.presentToast('Upload Sucessfull');
          this.loadingLoader.closeLoading();
          console.log(data);
          this.modalCtrl.dismiss(null,'ok');
        },
        err => {
          this.alertService.presentToast('Error in upload');
          this.loadingLoader.closeLoading();
          console.log(err);
        }
      );
  }

  dismiss(){
    this.modalCtrl.dismiss();
  }
}