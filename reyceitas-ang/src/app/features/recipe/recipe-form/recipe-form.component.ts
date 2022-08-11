import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Ingredient } from '@models/recipe/ingredient.model';
import { Instruction } from '@models/recipe/instruction.model';
import { Recipe } from '@models/recipe/recipe.model';
import { RecipeService } from '@services/recipe.service';
import { take } from 'rxjs';

@Component({
  selector: 'app-recipe-form',
  templateUrl: './recipe-form.component.html',
  styleUrls: ['./recipe-form.component.scss']
})
export class RecipeFormComponent implements OnInit {
  @Input() recipe: Recipe | undefined;
  
  form: FormGroup | undefined;

  constructor(private formBuilder: FormBuilder,
              private recipeService: RecipeService) { }

  ngOnInit(): void {
    this.createForm();
  }

  submit() {
    console.log(this.form)
    if(this.form?.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.recipeService.addRecipe(this.form?.value as Recipe)
      .pipe(take(1)).subscribe(console.log)
  }

  private createForm(): void {
    this.form = this.formBuilder.group({
      title: [this.recipe?.title, Validators.required],
      servings: [this.recipe?.servings, [Validators.required, Validators.min(1)]],
      difficulty: [this.recipe?.difficulty, [ Validators.min(1), Validators.max(10)]],
      ingredients: this.formBuilder.array([]),
      instructions: this.formBuilder.array([]),
      notes: [this.recipe?.notes]
    });
  }

}
