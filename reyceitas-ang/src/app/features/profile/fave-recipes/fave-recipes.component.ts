import { Component, OnInit } from '@angular/core';
import { Recipe } from '@models/recipe/recipe.model';
import { RecipeService } from '@services/recipe.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-fave-recipes',
  templateUrl: './fave-recipes.component.html',
  styleUrls: ['./fave-recipes.component.scss']
})
export class FaveRecipesComponent implements OnInit {

  recipes$: Observable<Recipe[]> = this.recipeService.getFavorites();

  constructor(private recipeService: RecipeService) { }

  ngOnInit(): void {
  }

}
