import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecipeComponent } from './recipe/recipe.component';
import { RecipeListComponent } from './recipe-list/recipe-list.component';
import { RecipeRoutingModule } from './recipe-routing.module';
import { RecipeCardComponent } from './recipe-card/recipe-card.component';
import { MaterialModule } from '../shared/material/material.module';
import { RecipeService } from 'src/app/core/services/recipe.service';

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
  ],
  providers: [
    RecipeService
  ]
})
export class RecipeModule { }
