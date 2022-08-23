import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Recipe } from '@models/recipe/recipe.model';
import { RecipeService } from '@services/recipe.service';
import { take, switchMap, map } from 'rxjs';

@Component({
  selector: 'app-recipe-search',
  templateUrl: './recipe-search.component.html',
  styleUrls: ['./recipe-search.component.scss']
})
export class RecipeSearchComponent implements OnInit {
  recipes: Recipe[] = [];
  searchTerm: string = '';

  constructor(private recipeService: RecipeService, 
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.getRecipes();
  }

  getRecipes(): void {
    this.route.queryParams.pipe(
      take(1),
      switchMap(queryParams => {
        this.searchTerm = (queryParams['search'] || '') as string;
        return this.recipeService.getRecipes(this.searchTerm)
          .pipe(map((recipes) => {
            this.recipes = recipes;
          }));
      })
    ).subscribe()
  }
}
