import { Component, Input, OnInit } from '@angular/core';
import { Recipe } from '@models/recipe/recipe.model';

@Component({
  selector: 'app-recipe-card',
  templateUrl: './recipe-card.component.html',
  styleUrls: ['./recipe-card.component.scss']
})
export class RecipeCardComponent implements OnInit {
  @Input() recipe: Recipe | undefined;

  constructor() { }

  ngOnInit(): void {
  }

  getPicture(): string {
    return this.recipe?.pictures ? this.recipe.pictures[0] : '';
  }

}
