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
import { ImageUploadFormComponent } from './recipe-form/image-upload-form/image-upload-form.component';
import { InterfaceModule } from '../shared/interface/interface.module';

@NgModule({
  declarations: [
    RecipeListComponent,
    RecipeComponent,
    RecipeCardComponent,
    RecipeFormComponent,
    InstructionsFormComponent,
    IngredientsFormComponent,
    ImageUploadFormComponent
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
