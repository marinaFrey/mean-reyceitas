import { Injectable } from '@angular/core';
import { RECIPES_ENDPOINT } from '@constants/endpoints.constant';
import { Recipe } from '@models/recipe/recipe.model';
import { Observable, of } from 'rxjs';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  constructor(private api: ApiService) { }

  getRecipes(): Observable<Recipe[]> {
    return this.api.get(RECIPES_ENDPOINT);
  }

  getRecipe(id: string | null): Observable<Recipe> {
    return this.api.get(`${RECIPES_ENDPOINT}/get/${id}`);
  }

  addRecipe() {
    
  }

  editRecipe() {

  }

  deleteRecipe() {

  }
}
