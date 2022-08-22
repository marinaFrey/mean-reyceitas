import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Recipe } from '@models/recipe/recipe.model';
import { RecipeService } from '@services/recipe.service';
import { take } from 'rxjs';

@Component({
  selector: 'app-print-recipe',
  templateUrl: './print-recipe.component.html',
  styleUrls: ['./print-recipe.component.scss'],
  providers: [
    RecipeService
  ]
})
export class PrintRecipeComponent implements OnInit {
  recipe!: Recipe;

  constructor(private route: ActivatedRoute,
              private recipeService: RecipeService) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.getRecipe(id);
  }

  private getRecipe(id: string | null): void {
    this.recipeService.getRecipe(id).pipe(take(1)).subscribe((recipe)=> this.recipe = recipe)
  }

}
