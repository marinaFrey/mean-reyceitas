import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileComponent } from './profile.component';
import { ProfileRoutingModule } from './profile-routing.module';
import { MaterialModule } from '../shared/material/material.module';
import { MyRecipesComponent } from './my-recipes/my-recipes.component';
import { FaveRecipesComponent } from './fave-recipes/fave-recipes.component';
import { ProfileInfoComponent } from './profile-info/profile-info.component';
import { InterfaceModule } from '../shared/interface/interface.module';
import { SharedRecipeModule } from '../shared/shared-recipe/shared-recipe.module';



@NgModule({
  declarations: [
    ProfileComponent,
    MyRecipesComponent,
    FaveRecipesComponent,
    ProfileInfoComponent
  ],
  imports: [
    CommonModule,
    ProfileRoutingModule,
    MaterialModule,
    InterfaceModule,
    SharedRecipeModule
  ]
})
export class ProfileModule { }
