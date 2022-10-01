import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '@guards/auth.guard';
import { RecipeAddComponent } from './recipe-add/recipe-add.component';
import { RecipeEditComponent } from './recipe-edit/recipe-edit.component';
import { RecipeSearchComponent } from './recipe-search/recipe-search.component';
import { RecipeComponent } from './recipe/recipe.component';

const routes: Routes = [
  {
    path: '', component: RecipeSearchComponent,
  },
  {
    canActivate: [AuthGuard],
    path: 'new', 
    component: RecipeAddComponent,
  },
  {
    canActivate: [AuthGuard],
    path: 'edit/:id', 
    component: RecipeEditComponent,
  },
  {
    path: 'recipe/:id', 
    component: RecipeComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RecipeRoutingModule { }
