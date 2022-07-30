import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecipeComponent } from './recipe/recipe.component';
import { RecipeListComponent } from './recipe-list/recipe-list.component';
import { RecipeRoutingModule } from './recipe-routing.module';
import { RecipeCardComponent } from './recipe-card/recipe-card.component';
import { MaterialModule } from '../shared/material/material.module';

@NgModule({
  declarations: [
    RecipeListComponent,
    RecipeComponent,
    RecipeCardComponent
  ],
  imports: [
    CommonModule,
    RecipeRoutingModule,
    MaterialModule
  ]
})
export class RecipeModule { }
