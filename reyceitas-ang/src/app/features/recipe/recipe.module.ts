import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecipeComponent } from './recipe/recipe.component';
import { RecipeListComponent } from './recipe-list/recipe-list.component';
import { RecipeRoutingModule } from './recipe-routing.module';
import { RecipeCardComponent } from './recipe-list/recipe-card/recipe-card.component';
import { MaterialModule } from '../shared/material/material.module';
import { RecipeService } from 'src/app/core/services/recipe.service';
import { RecipeFormComponent } from './recipe-form/recipe-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { InstructionsFormComponent } from './recipe-form/instructions-form/instructions-form.component';
import { IngredientsFormComponent } from './recipe-form/ingredients-form/ingredients-form.component';
import { InterfaceModule } from '../shared/interface/interface.module';
import { RecipeAddComponent } from './recipe-add/recipe-add.component';
import { RecipeEditComponent } from './recipe-edit/recipe-edit.component';
import { PicturesFormComponent } from './recipe-form/pictures-form/pictures-form.component';

@NgModule({
  declarations: [
    RecipeListComponent,
    RecipeComponent,
    RecipeCardComponent,
    RecipeFormComponent,
    InstructionsFormComponent,
    IngredientsFormComponent,
    RecipeAddComponent,
    RecipeEditComponent,
    PicturesFormComponent
  ],
  imports: [
    CommonModule,
    RecipeRoutingModule,
    InterfaceModule,
    MaterialModule,
    ReactiveFormsModule,
  ],
  providers: [
    RecipeService
  ]
})
export class RecipeModule { }
