import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Recipe } from '@models/recipe/recipe.model';
import { RecipeService } from '@services/recipe.service';
import { take } from 'rxjs';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.scss']
})
export class RecipeEditComponent implements OnInit {
  recipe!: Recipe;
  
  constructor(private recipeService: RecipeService,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.getRecipe(id);
  }

  private getRecipe(id: string | null): void {
    this.recipeService.getRecipe(id).pipe(take(1)).subscribe((recipe)=> this.recipe = recipe)
  }

}
