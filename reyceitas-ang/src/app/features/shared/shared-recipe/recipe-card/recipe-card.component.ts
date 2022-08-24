import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RECIPE_LIST_ROUTE, RECIPE_ROUTE } from '@constants/routes.constant';
import { Recipe } from '@models/recipe/recipe.model';

@Component({
  selector: 'app-recipe-card',
  templateUrl: './recipe-card.component.html',
  styleUrls: ['./recipe-card.component.scss']
})
export class RecipeCardComponent implements OnInit {
  @Input() recipe: Recipe | undefined;

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  getPicture(): string {
    return this.recipe?.pictures ? this.recipe.pictures[0] : '';
  }

  goToRecipe(): void {
    this.router.navigate([`${RECIPE_LIST_ROUTE}/${RECIPE_ROUTE}/${this.recipe?._id}`])
  }

}
