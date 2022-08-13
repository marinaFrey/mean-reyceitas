import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Ingredient } from '@models/recipe/ingredient.model';
import { Instruction } from '@models/recipe/instruction.model';
import { Recipe } from '@models/recipe/recipe.model';
import { AlertService } from '@services/alert.service';
import { RecipeService } from '@services/recipe.service';
import { take } from 'rxjs';

@Component({
  selector: 'app-recipe-form',
  templateUrl: './recipe-form.component.html',
  styleUrls: ['./recipe-form.component.scss']
})
export class RecipeFormComponent implements OnInit {
  @Input() recipe: Recipe | undefined;
  @Output() recipeSubmitted: EventEmitter<Recipe> = new EventEmitter<Recipe>();
  
  form: FormGroup | undefined;

  constructor(private formBuilder: FormBuilder,
              private alert: AlertService,
              private recipeService: RecipeService) { }

  ngOnInit(): void {
    this.createForm();
  }

  submit() {
    if(this.form?.invalid) {
      this.alert.error('Please fill all required fields')
      this.form.markAllAsTouched();
      return;
    }
    this.recipeSubmitted.emit(this.form?.value as Recipe);
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
