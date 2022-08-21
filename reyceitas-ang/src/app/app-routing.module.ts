import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RECIPE_LIST_ROUTE } from '@constants/routes.constant';

const routes: Routes = [
  { path: '',   redirectTo: '/home', pathMatch: 'full' },
  {
    path: 'home',
    loadChildren: () => import('./features/home/home.module').then(m => m.HomeModule)
  },
  {
    path: RECIPE_LIST_ROUTE,
    loadChildren: () => import('./features/recipe/recipe.module').then(m => m.RecipeModule)
  }
  //{ path: '**', component: PageNotFoundComponent }, 
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
