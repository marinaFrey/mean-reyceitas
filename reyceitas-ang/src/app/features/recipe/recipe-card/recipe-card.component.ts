import { Component, Input, OnInit } from '@angular/core';
import { Recipe } from 'src/app/core/models/recipe.model';

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

}
