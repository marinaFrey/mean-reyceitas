import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Recipe } from 'src/app/core/models/recipe.model';
import { RecipeService } from 'src/app/core/services/recipe.service';
import { take } from 'rxjs';

@Component({
  selector: 'app-recipe',
  templateUrl: './recipe.component.html',
  styleUrls: ['./recipe.component.scss']
})
export class RecipeComponent implements OnInit {
  recipe: Recipe | undefined;

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
