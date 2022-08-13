import { Component, Input, OnInit } from '@angular/core';
import { Recipe } from '@models/recipe/recipe.model';

@Component({
  selector: 'app-servings',
  templateUrl: './servings.component.html',
  styleUrls: ['./servings.component.scss']
})
export class ServingsComponent implements OnInit {
  @Input() recipe!: Recipe;

  servings: number = 0;

  constructor() { }

  ngOnInit(): void {
    this.servings = this.recipe?.servings ?? 0
  }

}
