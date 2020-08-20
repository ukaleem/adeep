import { NgModule } from '@angular/core';
import { ImagePickerComponent } from './image-picker/image-picker.component';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { CustomLoaderComponent } from './custom-loader/custom-loader.component';
import { ImgPickerComponent } from './img-picker/img-picker.component';

@NgModule({
  entryComponents: [CustomLoaderComponent, ImagePickerComponent , ImgPickerComponent],
  declarations: [ImagePickerComponent , CustomLoaderComponent,ImgPickerComponent ],
  imports: [CommonModule, IonicModule],
  exports: [CustomLoaderComponent, ImagePickerComponent],
})

export class SharedModule { }
