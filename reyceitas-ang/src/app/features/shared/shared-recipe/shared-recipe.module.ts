import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DifficultyComponent } from './difficulty/difficulty.component';
import { MaterialModule } from '../material/material.module';
import { RecipeCardComponent } from './recipe-card/recipe-card.component';
import { InterfaceModule } from '../interface/interface.module';
import { TagsComponent } from './tags/tags.component';
import { RecipeListComponent } from './recipe-list/recipe-list.component';
import { RecipeShowcaseComponent } from './recipe-showcase/recipe-showcase.component';

const components = [
  DifficultyComponent,
  RecipeCardComponent,
  TagsComponent,
  RecipeListComponent,
  RecipeShowcaseComponent
]

@NgModule({
  declarations: [components ],
  exports: [components],
  imports: [
    CommonModule,
    MaterialModule,
    InterfaceModule
  ]
})
export class SharedRecipeModule { }
