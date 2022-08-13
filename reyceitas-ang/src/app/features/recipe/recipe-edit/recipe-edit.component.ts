import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HOME_ROUTE, RECIPE_LIST_ROUTE, RECIPE_ROUTE } from '@constants/routes.constant';
import { Recipe } from '@models/recipe/recipe.model';
import { AlertService } from '@services/alert.service';
import { RecipeService } from '@services/recipe.service';
import { take } from 'rxjs';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.scss']
})
export class RecipeEditComponent implements OnInit {
  recipe!: Recipe;
  recipeId: string = '';
  
  constructor(private recipeService: RecipeService,
              private alert: AlertService,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit(): void {
    this.recipeId = this.route.snapshot.paramMap.get('id') || '';
    if(this.recipeId != '')
      this.getRecipe(this.recipeId);
    else
      this.router.navigate([HOME_ROUTE]);
  }

  private getRecipe(id: string | null): void {
    this.recipeService.getRecipe(id).pipe(take(1)).subscribe((recipe)=> this.recipe = recipe)
  }

  editRecipe(recipe: Recipe) {
    this.recipeService.editRecipe(this.recipeId, recipe)
      .pipe(take(1)).subscribe((savedRecipe) => {
        this.alert.success('Recipe edit successfully');
        this.router.navigate([`/${RECIPE_LIST_ROUTE}/${RECIPE_ROUTE}/${savedRecipe?._id}`])
      })
  }

}
