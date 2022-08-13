import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EDIT_ROUTE, RECIPE_LIST_ROUTE, RECIPE_ROUTE } from '@constants/routes.constant';
import { Recipe } from '@models/recipe/recipe.model';
import { AlertService } from '@services/alert.service';
import { RecipeService } from '@services/recipe.service';
import { take } from 'rxjs';

@Component({
  selector: 'app-recipe-add',
  templateUrl: './recipe-add.component.html',
  styleUrls: ['./recipe-add.component.scss']
})
export class RecipeAddComponent implements OnInit {

  constructor(private recipeService: RecipeService, 
              private alert: AlertService,
              private router: Router) { }

  ngOnInit(): void {
  }

  addRecipe(recipe: Recipe) {
    this.recipeService.addRecipe(recipe)
      .pipe(take(1)).subscribe((savedRecipe) => {
        this.alert.success('Recipe saved');
        this.router.navigate([`/${RECIPE_LIST_ROUTE}/${RECIPE_ROUTE}/${savedRecipe?._id}`])
      })
  }

}
