import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Recipe } from '@models/recipe/recipe.model';
import { RecipeService } from 'src/app/core/services/recipe.service';
import { take } from 'rxjs';
import { RECIPE_LIST_ROUTE } from '@constants/routes.constant';
import { AlertService } from '@services/alert.service';
import { Ingredient } from '@models/recipe/ingredient.model';

@Component({
  selector: 'app-recipe',
  templateUrl: './recipe.component.html',
  styleUrls: ['./recipe.component.scss']
})
export class RecipeComponent implements OnInit {
  recipe!: Recipe;
  calculatedIngredients: Ingredient[] = [];

  constructor(private route: ActivatedRoute,
              private router: Router,
              private alert: AlertService,
              private recipeService: RecipeService) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.getRecipe(id);
  }

  deleteRecipe(): void {
    this.recipeService.deleteRecipe(this.recipe._id)
      .pipe(take(1)).subscribe(() => {
        this.alert.success('Recipe deleted')
        this.router.navigate([RECIPE_LIST_ROUTE])
      });
  }

  getIngredients(): Ingredient[] | undefined {
    if(this.calculatedIngredients.length) return this.calculatedIngredients;
    return this.recipe?.ingredients;
  }

  private getRecipe(id: string | null): void {
    this.recipeService.getRecipe(id).pipe(take(1)).subscribe((recipe)=> this.recipe = recipe)
  }

}
