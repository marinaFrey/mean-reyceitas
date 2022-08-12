import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImageCarouselComponent } from './image-carousel/image-carousel.component';
import { MaterialModule } from '../material/material.module';
import { MatFormFieldModule } from '@angular/material/form-field';
import { DropdownComponent } from './dropdown/dropdown.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ImageUploadComponent } from './image-upload/image-upload.component';

const components = [
  ImageCarouselComponent,
  ImageUploadComponent,
  DropdownComponent
]

@NgModule({
  declarations: [components],
  exports: [components],
  imports: [
    CommonModule,
    MaterialModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class InterfaceModule { }
