import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PrintRecipeComponent } from './print-recipe/print-recipe.component';

const routes: Routes = [
  {
    path: 'recipe/:id', component: PrintRecipeComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PrintRoutingModule { }
