import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Recipe } from '@models/recipe/recipe.model';
import { RecipeService } from 'src/app/core/services/recipe.service';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.scss']
})
export class RecipeListComponent implements OnInit {

  recipes$: Observable<Recipe[]> = this.recipeService.getRecipes();

  constructor(private recipeService: RecipeService) { }

  ngOnInit(): void {
  }

}
