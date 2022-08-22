import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrintRecipeComponent } from './print-recipe/print-recipe.component';
import { PrintRoutingModule } from './print-routing.module';



@NgModule({
  declarations: [
    PrintRecipeComponent,
  ],
  imports: [
    CommonModule,
    PrintRoutingModule
  ]
})
export class PrintModule { }
