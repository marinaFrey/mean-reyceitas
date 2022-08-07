import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
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

  units$: Observable<Unit[]> = this.recipeService.getUnits();
  
  constructor(private formBuilder: FormBuilder,
              private recipeService: RecipeService) { }

  ngOnInit(): void {
  }

  get ingredients() {
    return this.form?.controls["ingredients"] as FormArray;
  }

  addIngredient() {
    const ingredientForm = this.formBuilder.group({
      amount: [null, Validators.required],
      unit: [null, Validators.required],
      food: [null],
      details: [""]
    });

    this.ingredients.push(ingredientForm);
  }

  deleteIngredient(index: number) {
    this.ingredients.removeAt(index);
  }

  getIngredientFormGroup(ingredient: any) {
    return ingredient as FormGroup;
  }

  getUnitName(unit: Unit) {
    return unit?.abbreviation;
  }
}
