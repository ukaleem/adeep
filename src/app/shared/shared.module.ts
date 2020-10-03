import { NgModule } from '@angular/core';
import { ImagePickerComponent } from './image-picker/image-picker.component';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { CustomLoaderComponent } from './custom-loader/custom-loader.component';
import { ImgPickerComponent } from './img-picker/img-picker.component';
import { FormsModule } from '@angular/forms';
import { CustomSearchComponent } from './custom-search/custom-search.component';
import { InternetComponent } from './internet/internet.component';

@NgModule({
  entryComponents: [CustomLoaderComponent, ImagePickerComponent ,InternetComponent,CustomSearchComponent, ImgPickerComponent],
  declarations: [ImagePickerComponent , CustomLoaderComponent,InternetComponent, CustomSearchComponent,ImgPickerComponent ],
  imports: [CommonModule, IonicModule ,FormsModule],
  exports: [CustomLoaderComponent,CustomSearchComponent,InternetComponent, ImagePickerComponent],
})

export class SharedModule { }
