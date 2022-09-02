import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { HomeRoutingModule } from './home-routing.module';
import { MaterialModule } from '../shared/material/material.module';
import { SharedRecipeModule } from '../shared/shared-recipe/shared-recipe.module';
import { InterfaceModule } from '../shared/interface/interface.module';



@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    MaterialModule,
    SharedRecipeModule,
    InterfaceModule
  ]
})
export class HomeModule { }
