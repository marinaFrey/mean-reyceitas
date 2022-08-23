import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ADMIN_PANEL_ROUTE, HOME_ROUTE, PRINT_ROUTE, RECIPE_LIST_ROUTE } from '@constants/routes.constant';
import { RegularLayoutComponent } from './core/components/layouts/regular-layout/regular-layout.component';

const routes: Routes = [
  { path: '',   redirectTo: '/home', pathMatch: 'full' },
  {
    path: '',
    component: RegularLayoutComponent,
    children: [
      {
        path: HOME_ROUTE,
        loadChildren: () => import('./features/home/home.module').then(m => m.HomeModule)
      },
      {
        path: RECIPE_LIST_ROUTE,
        loadChildren: () => import('./features/recipe/recipe.module').then(m => m.RecipeModule)
      },
      {
        path: ADMIN_PANEL_ROUTE,
        loadChildren: () => import('./features/admin-panel/admin-panel.module').then(m => m.AdminPanelModule)
      }
    ]
  },
  {
    path: PRINT_ROUTE,
    loadChildren: () => import('./features/print/print.module').then(m => m.PrintModule)
  }
  //{ path: '**', component: PageNotFoundComponent }, 
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
