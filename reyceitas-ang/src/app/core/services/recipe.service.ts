import { Injectable } from '@angular/core';
import { FOODS_ENDPOINT, RECIPES_ENDPOINT, UNITS_ENDPOINT } from '@constants/endpoints.constant';
import { Food } from '@models/recipe/ingredient.model';
import { Recipe } from '@models/recipe/recipe.model';
import { Unit, UnitType } from '@models/recipe/unit.model';
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

  addRecipe(recipe: Recipe): Observable<any> {
    return this.api.post(`${RECIPES_ENDPOINT}/new`, recipe)
  }

  editRecipe(index: string, recipe: Recipe) {
    return this.api.post(`${RECIPES_ENDPOINT}/edit/${index}`, recipe)
  }

  deleteRecipe(index: string) {
    return this.api.delete(`${RECIPES_ENDPOINT}/delete/${index}`)
  }

  getUnits(): Observable<Unit[]> {
    return this.api.get(`${UNITS_ENDPOINT}`);
  }

  getFoods(): Observable<Food[]> {
    return this.api.get(`${FOODS_ENDPOINT}`);
  }
}
