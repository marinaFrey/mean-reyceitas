import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecipeComponent } from './recipe/recipe.component';
import { RecipeRoutingModule } from './recipe-routing.module';
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
import { InstructionComponent } from './recipe/instruction/instruction.component';
import { ServingsComponent } from './recipe/basic-information/servings/servings.component';
import { IngredientsComponent } from './recipe/ingredients/ingredients.component';
import { TagsFormComponent } from './recipe-form/tags-form/tags-form.component';
import { AuthGuard } from '@guards/auth.guard';
import { SharedRecipeModule } from '../shared/shared-recipe/shared-recipe.module';
import { RecipeSearchComponent } from './recipe-search/recipe-search.component';

@NgModule({
  declarations: [
    RecipeComponent,
    RecipeFormComponent,
    InstructionsFormComponent,
    IngredientsFormComponent,
    RecipeAddComponent,
    RecipeEditComponent,
    PicturesFormComponent,
    InstructionComponent,
    ServingsComponent,
    IngredientsComponent,
    TagsFormComponent,
    RecipeSearchComponent
  ],
  imports: [
    CommonModule,
    RecipeRoutingModule,
    InterfaceModule,
    MaterialModule,
    ReactiveFormsModule,
    SharedRecipeModule
  ],
  providers: [
    RecipeService,
    AuthGuard
  ]
})
export class RecipeModule { }
