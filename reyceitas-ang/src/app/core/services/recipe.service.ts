import { Injectable } from '@angular/core';
import { FOODS_ENDPOINT, RECIPES_ENDPOINT, RECIPES_FAVORITE_ENDPOINT, TAGS_ENDPOINT, UNITS_ENDPOINT } from '@constants/endpoints.constant';
import { Food } from '@models/recipe/ingredient.model';
import { Recipe, Tag } from '@models/recipe/recipe.model';
import { Unit, UnitType } from '@models/recipe/unit.model';
import { Observable, of } from 'rxjs';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  constructor(private api: ApiService) { }

  getRecipes(searchTerm?: string): Observable<Recipe[]> {
    return this.api.get(`${RECIPES_ENDPOINT}/search-by-name/${searchTerm}`);
  }

  getRecipe(id: string | null): Observable<Recipe> {
    return this.api.get(`${RECIPES_ENDPOINT}/get/${id}`);
  }

  addRecipe(recipe: Recipe): Observable<any> {
    return this.api.post(`${RECIPES_ENDPOINT}/new`, recipe)
  }

  editRecipe(index: string, recipe: Recipe) {
    return this.api.put(`${RECIPES_ENDPOINT}/edit/${index}`, recipe)
  }

  deleteRecipe(index: string) {
    return this.api.delete(`${RECIPES_ENDPOINT}/delete/${index}`)
  }

  getFavorites(): Observable<Recipe[]> {
    return this.api.get(`${RECIPES_FAVORITE_ENDPOINT}`);
  }

  setRecipeFavorite(index: string, isFavorite: boolean) {
    return this.api.put(`${RECIPES_FAVORITE_ENDPOINT}/toggle/${index}`,{ toggle: isFavorite });
  }

  getUnits(): Observable<Unit[]> {
    return this.api.get(`${UNITS_ENDPOINT}`);
  }

  getFoods(): Observable<Food[]> {
    return this.api.get(`${FOODS_ENDPOINT}`);
  }

  getTags(): Observable<Tag[]> {
    return this.api.get(`${TAGS_ENDPOINT}`);
  }
}
