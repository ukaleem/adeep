import { NgModule } from '@angular/core';
import { ImagePickerComponent } from './image-picker/image-picker.component';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { CustomLoaderComponent } from './custom-loader/custom-loader.component';
import { UploadImagePickerComponent } from './upload-image-picker/upload-image-picker.component';
import { ImgPickerComponent } from './img-picker/img-picker.component';
import { LoadMapComponent } from './load-map/load-map.component';

@NgModule({
  entryComponents: [CustomLoaderComponent, ImagePickerComponent , ImgPickerComponent],
  declarations: [ImagePickerComponent , CustomLoaderComponent,ImgPickerComponent, UploadImagePickerComponent, LoadMapComponent],
  imports: [CommonModule, IonicModule],
  exports: [CustomLoaderComponent, ImagePickerComponent, UploadImagePickerComponent, LoadMapComponent],
})

export class SharedModule { }
