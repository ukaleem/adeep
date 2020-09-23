import { NgModule } from '@angular/core';
import { ImagePickerComponent } from './image-picker/image-picker.component';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { CustomLoaderComponent } from './custom-loader/custom-loader.component';
import { ImgPickerComponent } from './img-picker/img-picker.component';
import { FormsModule } from '@angular/forms';
import { CustomSearchComponent } from './custom-search/custom-search.component';

@NgModule({
  entryComponents: [CustomLoaderComponent, ImagePickerComponent ,CustomSearchComponent, ImgPickerComponent],
  declarations: [ImagePickerComponent , CustomLoaderComponent, CustomSearchComponent,ImgPickerComponent ],
  imports: [CommonModule, IonicModule ,FormsModule],
  exports: [CustomLoaderComponent,CustomSearchComponent, ImagePickerComponent],
})

export class SharedModule { }
