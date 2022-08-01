import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Recipe } from '../models/recipe.model';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  constructor(private api: ApiService) { }

  getRecipes(): Observable<Recipe[]> {
    return this.api.get('/api/recipes');
    /*
    let recipe: Recipe = {
      id: 'uuid',
      title: 'this is a title',
      description: 'this is a description'
    };
    let recipes = [];
    for(let i = 0; i < 15; i ++)
      recipes.push(recipe);

    return of(recipes)*/
  }

  getRecipe(id: string | null): Observable<Recipe> {
    return this.api.get('/api/recipes/get/'+ id);
    /*
    return of({
      id: 'uuid',
      title: 'this is a title',
      description: 'this is a description'
    })*/
  }

  addRecipe() {
    
  }

  editRecipe() {

  }

  deleteRecipe() {

  }
}
