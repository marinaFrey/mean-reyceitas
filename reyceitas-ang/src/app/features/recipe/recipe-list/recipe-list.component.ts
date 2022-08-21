import { Component, OnInit } from '@angular/core';
import { map, Observable, shareReplay, switchMap, take } from 'rxjs';
import { Recipe } from '@models/recipe/recipe.model';
import { RecipeService } from 'src/app/core/services/recipe.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.scss']
})
export class RecipeListComponent implements OnInit {
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
        return this.recipeService.getRecipes(this.searchTerm).pipe(map((recipes) => this.recipes = recipes));
      })
    ).subscribe()
  }
}
