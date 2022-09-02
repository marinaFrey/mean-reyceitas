import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RECIPE_LIST_ROUTE, RECIPE_ROUTE } from '@constants/routes.constant';
import { Recipe } from '@models/recipe/recipe.model';
import { RecipeService } from '@services/recipe.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  recipes$: Observable<Recipe[]> = this.recipeService.getRecipes('');
  constructor(private recipeService: RecipeService) { }

  ngOnInit(): void {
  }

}
