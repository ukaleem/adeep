import { Component, OnInit, PlatformRef } from '@angular/core';
import { WebView } from '@ionic-native/ionic-webview/ngx';
import { File, FileEntry } from '@ionic-native/File/ngx';
import { Camera, CameraOptions, PictureSourceType } from '@ionic-native/camera/ngx';
import { FilePath } from '@ionic-native/file-path/ngx';
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
    private camera: Camera,
    private plt: Platform,
    private modalCtrl: ModalController,
    private filePath: FilePath,
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
  async selectImage() {
    const actionSheet = await this.actionSheetController.create({
      header: 'Select Image source',
      buttons: [{
        text: 'Load from Library',
        handler: () => {
          this.takePicture(this.camera.PictureSourceType.PHOTOLIBRARY);
        }
      },
      {
        text: 'Use Camera',
        handler: () => {
          this.takePicture(this.camera.PictureSourceType.CAMERA);
        }
      },
      {
        text: 'Cancel',
        role: 'cancel'
      }]
    });
    await actionSheet.present();
  }

  takePicture(sourceType: PictureSourceType) {
    const options: CameraOptions = {
      quality: 100,
      sourceType: sourceType,
      saveToPhotoAlbum: false,
      correctOrientation: true
    };
    this.camera.getPicture(options).then(imagePath => {
      if (this.plt.is('android') && sourceType ===
        this.camera.PictureSourceType.PHOTOLIBRARY) {
        this.filePath.resolveNativePath(imagePath).then(filePath => {
          const correctPath = filePath.substr(0, filePath.lastIndexOf('/') + 1);
          const currentName = imagePath.substring(
            imagePath.lastIndexOf('/') + 1,
            imagePath.lastIndexOf('?'));
          this.copyFileToLocalDir(
            correctPath,
            currentName,
            this.createFileName()
          );
        });
      } else {
        const currentName = imagePath.substr(imagePath.lastIndexOf('/') + 1);
        const correctPath = imagePath.substr(0, imagePath.lastIndexOf('/') + 1);
        this.copyFileToLocalDir(
          correctPath,
          currentName,
          this.createFileName()
        );
      }
    });
  }

  createFileName() {
    const d = new Date(),
      n = d.getTime(),
      newFileName = n + '.jpg';
    return newFileName;
  }
  copyFileToLocalDir(namePath, currentName, newFileName) {
    this.file.copyFile(namePath, currentName, this.file.dataDirectory, newFileName).then(
      success => {
        this.updateStoredImages(newFileName);
        this.alertService.presentToast('Success while storing file.');
      },
      error => {
        this.alertService.presentToast('Error while storing file.');
      });
  }

  updateStoredImages(name) {
    localStorage.get(this.STORAGE_KEY).then(images => {
      let arr = [];
      if (images && images !== '' && images.length > 0) {
        arr = JSON.parse(images);
      } else {
        arr = [];
      }
      if (!arr) {
        const newImages = [name];
        localStorage.set('my_images', JSON.stringify(newImages));
      } else {
        arr.push(name);
        localStorage.set('my_images', JSON.stringify(arr));
      }
      const filePath = this.file.dataDirectory + name;
      const resPath = filePath // this.pathForImage(filePath);
      const newEntry = {
        name: name,
        path: resPath,
        filePath: filePath
      };
      this.images = [newEntry, ...this.images];
    });
  }

  startUpload(imgEntry, position) {
    this.file
      .resolveLocalFilesystemUrl(imgEntry.filePath)
      .then(entry => {
        (<FileEntry>entry).file(file => this.readFile(file, imgEntry, position));
      })
      .catch(err => {
        this.alertService.presentToast('Error while reading file.');
      });
  }

  readFile(file: any, imgEntry, position) {
    const reader = new FileReader();
    reader.onload = () => {
      const formData = new FormData();
      const imgBlob = new Blob([reader.result], {
        type: file.type
      });
      formData.append('file', imgBlob, file.name);
      this.uploadImageData(formData, imgEntry, position);
    };
    reader.readAsArrayBuffer(file);
  }

  async uploadImageData(formData: FormData, imgEntry, position) {
    const loading = await this.loadingController.create({
      message: 'Uploading image...'
    });
    await loading.present();
    this.http.post(`<<YOUR API>>`, formData).subscribe(res => {
      loading.dismiss();
        if (res['success']) {
          this.alertService.presentToast('File upload complete.');
        } else {
          this.alertService.presentToast('File upload failed.');
        }
      });
  }

  deleteImage(imgEntry, position) {
    this.images.splice(position, 1);
    localStorage.get('my_images').then(images => {
      const arr = JSON.parse(images);
      const filtered = arr.filter(name => name !== imgEntry.name);
      localStorage.set('my_images', JSON.stringify(filtered));
      const correctPath = imgEntry.filePath.substr(0,
        imgEntry.filePath.lastIndexOf('/') + 1);
      this.file.removeFile(correctPath, imgEntry.name).then(res => {
        this.alertService.presentToast('File removed.');
      });
    });
  }

}
