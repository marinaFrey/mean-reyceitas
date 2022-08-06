import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-ingredients-form',
  templateUrl: './ingredients-form.component.html',
  styleUrls: ['./ingredients-form.component.scss']
})
export class IngredientsFormComponent implements OnInit {
  @Input() form!: FormGroup;
  
  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
  }

  get ingredients() {
    return this.form?.controls["ingredients"] as FormArray;
  }

  addIngredient() {
    const ingredientForm = this.formBuilder.group({
      amount: [null, Validators.required],
      unit: [null],
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


}
