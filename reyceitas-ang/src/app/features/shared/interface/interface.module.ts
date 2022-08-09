import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImageCarouselComponent } from './image-carousel/image-carousel.component';
import { MaterialModule } from '../material/material.module';
import { MatFormFieldModule } from '@angular/material/form-field';

const components = [
  ImageCarouselComponent
]

@NgModule({
  declarations: [components],
  exports: [components],
  imports: [
    CommonModule,
    MaterialModule,
    MatFormFieldModule
  ]
})
export class InterfaceModule { }
