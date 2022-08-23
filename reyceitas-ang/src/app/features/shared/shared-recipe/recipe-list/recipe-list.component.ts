import { Component, Input, OnInit } from '@angular/core';
import { Recipe } from '@models/recipe/recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.scss']
})
export class RecipeListComponent implements OnInit {
  @Input() recipes: Recipe[] = [];

  constructor() { }

  ngOnInit(): void {
  }

}
