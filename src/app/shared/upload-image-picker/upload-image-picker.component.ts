
import { Component, OnInit, Output, ElementRef, ViewChild , EventEmitter} from '@angular/core';
import { ActionSheetController, Platform } from '@ionic/angular';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { File } from "@ionic-native/file/ngx";

import {
  Plugins,
  Capacitor,
  CameraSource,
  CameraResultType,
} from '@capacitor/core';
import { FilePath } from '@ionic-native/file-path/ngx';

@Component({
  selector: 'app-upload-image-picker',
  templateUrl: './upload-image-picker.component.html',
  styleUrls: ['./upload-image-picker.component.scss'],
})

export class UploadImagePickerComponent implements OnInit {
  @Output() imageSelectedPicker = new EventEmitter<string | File | any>();
  @ViewChild('filePiker', { static: false }) filePickerRef: ElementRef<HTMLInputElement>;
  selectedImage: any;
  usePicker = false;

  constructor(private actionSheetController: ActionSheetController,
    private filePath: FilePath,
    private file: File,
    private camera: Camera, private plt: Platform) { }

  ngOnInit() {
    console.log('Mobile', this.plt.is('mobile'));
    console.log('hybrid', this.plt.is('hybrid'));
    console.log('ios', this.plt.is('ios'));
    console.log('android', this.plt.is('android'));
    console.log('desktop', this.plt.is('desktop'));
    if ((this.plt.is('mobile') && !this.plt.is('hybrid')) || this.plt.is('desktop')) {
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
      // encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY
    };

    this.selectedImage = '../../../assets/images/no-preview.jpg';
    this.camera.getPicture(options).then(
      imageData => {

        // let filename = imageData.substring(imageData.lastIndexOf("/") + 1);
        // let path = imageData.substring(0, imageData.lastIndexOf("/") + 1);
        // console.log("path", path);
        // console.log("filename", filename);
        // //then use the method reasDataURL  btw. var_picture is ur image variable
        // this.file
        //   .readAsDataURL(path, filename)
        //   .then(res => {
        //     this.selectedImage = res;
        //     console.log("filename", this.selectedImage);
        //   });

        this.filePath
          .resolveNativePath(imageData)
          .then(filePath => {

            try{
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
            }catch(ex){
              let filename = filePath.substring(filePath.lastIndexOf("/") + 1);
              let path = filePath.substring(0, filePath.lastIndexOf("/") + 1);
              console.log("path", path);
              console.log("filename", filename);
              //then use the method reasDataURL  btw. var_picture is ur image variable
              this.file
                .readAsDataURL(path, filename)
                .then(res => {
                  this.selectedImage = res;
                  console.log("filename", this.selectedImage);
                });
            }
            

            let fileItem = {
              pathUri: filePath,
              fileName: filePath.substr(filePath.lastIndexOf("/") + 1),
              fileType: "file",
              uploadStatus: 1
            };
            this.imageSelectedPicker.emit(fileItem);
          })
          .catch(err => console.log(err));
      },
      err => {
        console.log(err);
      }
    );
    // Plugins.Camera.getPhoto({
    //   quality: 50,
    //   source: CameraSource.Photos,
    //   correctOrientation: true,
    //   height: 320,
    //   width: 200,
    //   resultType: CameraResultType.Uri,
    // })
    //   .then(image => {
    //     // this.selectedImage  = image.base64String;
    //     this.selectedImage  = image.webPath;
    //     console.log(image);
    //     this.imageSelectedPicker.emit(image);
    //   })
    //   .catch((error) => {
    //     console.log('Native Device Camera Error', error);
    //     if (this.usePicker) {
    //       this.filePickerRef.nativeElement.click();
    //     }
    //     return;
    //   });
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
    this.selectedImage = '../../../assets/images/no-preview.jpg';
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
            let fileItem = {
              pathUri: filePath,
              fileName: filePath.substr(filePath.lastIndexOf("/") + 1),
              fileType: "img",
              uploadStatus: 1
            };
            this.imageSelectedPicker.emit(fileItem);
          })
          .catch(err => console.log(err));
      },
      err => {
        alert("error " + JSON.stringify(err));

      }
    );

    // Plugins.Camera.getPhoto({
    //   quality: 50,
    //   source: CameraSource.Camera,
    //   correctOrientation: true,
    //   height: 320,
    //   width: 200,
    //   resultType: CameraResultType.Uri
    // })
    //   .then(image => {
    //     // this.selectedImage  = image.base64String;
    //     this.selectedImage  = image.path;
    //     console.log(image);
    //     this.imageSelectedPicker.emit(image);
    //   })
    //   .catch((error) => {
    //     console.log('Native Device Camera Error', error);
    //     if (this.usePicker) {
    //       this.filePickerRef.nativeElement.click();
    //     }
    //     return;
    //   });
  }

  // if we are not on native device the file chosen method implement
  onFileChosen(event: Event) {
    const pickedFile = (event.target as HTMLInputElement).files[0];
    if (!pickedFile) {
      return;
    }
    console.log(pickedFile);
    const fr = new FileReader();
    fr.onload = () => {
      const dataUrl = fr.result.toString();
      this.selectedImage = dataUrl;
    };
    fr.readAsDataURL(pickedFile);
    this.imageSelectedPicker.emit(pickedFile);
    console.log(event);
  }
}