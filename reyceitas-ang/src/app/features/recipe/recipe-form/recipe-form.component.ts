import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Recipe } from '@models/recipe/recipe.model';

@Component({
  selector: 'app-recipe-form',
  templateUrl: './recipe-form.component.html',
  styleUrls: ['./recipe-form.component.scss']
})
export class RecipeFormComponent implements OnInit {
  @Input() recipe: Recipe | undefined;
  
  form: FormGroup | undefined;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.createForm();
  }

  submit() {
    if(this.form?.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    // TODO: call endpoint to store recipe
  }

  private createForm(): void {
    this.form = this.formBuilder.group({
      title: [this.recipe?.title, Validators.required],
      servings: [this.recipe?.servings, [Validators.required, Validators.min(1)]],
      ingredients: this.formBuilder.array(this.recipe?.ingredients ?? []),
      instructions: this.formBuilder.array(this.recipe?.instructions ?? []),
      notes: [this.recipe?.notes]
    });
  }

  

  

}
