import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Food, Ingredient } from '@models/recipe/ingredient.model';
import { Unit } from '@models/recipe/unit.model';
import { RecipeService } from '@services/recipe.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-ingredients-form',
  templateUrl: './ingredients-form.component.html',
  styleUrls: ['./ingredients-form.component.scss']
})
export class IngredientsFormComponent implements OnInit {
  @Input() form!: FormGroup;
  @Input() ingredients: Ingredient[] | undefined;

  units$: Observable<Unit[]> = this.recipeService.getUnits();
  foods$: Observable<Food[]> = this.recipeService.getFoods();
  
  constructor(private formBuilder: FormBuilder,
              private recipeService: RecipeService) { }

  ngOnInit(): void {
    if(this.ingredients)
      this.getIngredients(this.ingredients);
  }

  get ingredientsFormArray() {
    return this.form?.controls["ingredients"] as FormArray;
  }

  addIngredient(ingredient?: Ingredient) {
    const ingredientForm = this.formBuilder.group({
      amount: [ingredient?.amount ?? null, Validators.required],
      unit: [ingredient?.unit, Validators.required],
      food: [ingredient?.food],
      details: [ingredient?.details ?? ""]
    });

    this.ingredientsFormArray.push(ingredientForm);
  }

  deleteIngredient(index: number) {
    this.ingredientsFormArray.removeAt(index);
  }

  getIngredientFormGroup(ingredient: any) {
    return ingredient as FormGroup;
  }

  getFoodFormControl(ingredient: any) {
    return ingredient.get('food') as FormControl;
  }

  getUnitName(unit: Unit) {
    return unit?.abbreviation;
  }

  getFoodName(food: Food) {
    return food?.name;
  }

  private getIngredients(ingredients: Ingredient[]): void {
    ingredients.forEach(ingredient => {
      this.addIngredient(ingredient);
    });
  }
}
