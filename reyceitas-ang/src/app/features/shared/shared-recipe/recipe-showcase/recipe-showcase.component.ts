import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RECIPE_LIST_ROUTE, RECIPE_ROUTE } from '@constants/routes.constant';
import { Recipe } from '@models/recipe/recipe.model';

@Component({
  selector: 'app-recipe-showcase',
  templateUrl: './recipe-showcase.component.html',
  styleUrls: ['./recipe-showcase.component.scss']
})
export class RecipeShowcaseComponent implements OnInit {
  @Input() recipes: Recipe[] = [];
  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  getPicture(recipe: Recipe): string {
    return recipe?.pictures ? recipe.pictures[0] : '';
  }

  goToRecipe(recipe: Recipe): void {
    this.router.navigate([`${RECIPE_LIST_ROUTE}/${RECIPE_ROUTE}/${recipe?._id}`])
  }

}
