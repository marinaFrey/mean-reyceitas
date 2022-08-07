import { Injectable } from '@angular/core';
import { RECIPES_ENDPOINT } from '@constants/endpoints.constant';
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

  addRecipe() {
    
  }

  editRecipe() {

  }

  deleteRecipe() {

  }

  getUnits(): Observable<Unit[]> {
    return of([
      {
        _id: "sdkjfl",
        abbreviation: "g",
        name: "grams",
        type: UnitType.WEIGHT
      },
      {
        _id: "sdk3423jfl",
        abbreviation: "l",
        name: "liters",
        type: UnitType.VOLUME
      },
      {
        _id: "sdkdfdgjfl",
        abbreviation: "ml",
        name: "mililiters",
        type: UnitType.VOLUME
      },
      {
        _id: "sdkj43ffgfl",
        abbreviation: "units",
        name: "an item",
        type: UnitType.UNIT
      },
      {
        _id: "sdk4234fgsjfl",
        abbreviation: "kg",
        name: "kilograms",
        type: UnitType.WEIGHT
      }
    ])
  }
}
