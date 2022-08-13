import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Ingredient } from '@models/recipe/ingredient.model';
import { Recipe } from '@models/recipe/recipe.model';

@Component({
  selector: 'app-servings',
  templateUrl: './servings.component.html',
  styleUrls: ['./servings.component.scss']
})
export class ServingsComponent implements OnInit {
  @Input() recipe!: Recipe;
  @Output() recalculatedIngredientAmounts: EventEmitter<Ingredient[]> = new EventEmitter<Ingredient[]>();

  servings: number = 0;

  constructor() { }

  ngOnInit(): void {
    this.servings = this.recipe?.servings ?? 0
  }

  calculateIngredientAmounts() {
    let ingredients: Ingredient[] = [];
    this.recipe?.ingredients?.forEach(ingredient => {
      ingredients.push({
        amount: (ingredient.amount / this.recipe.servings) * this.servings,
        unit: ingredient.unit,
        food: ingredient.food,
        details: ingredient.details
      })
    });
    this.recalculatedIngredientAmounts.emit(ingredients);
  }

}
