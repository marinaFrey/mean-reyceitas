import { Component, Input, OnInit } from '@angular/core';
import { Ingredient } from '@models/recipe/ingredient.model';

@Component({
  selector: 'app-ingredient',
  templateUrl: './ingredient.component.html',
  styleUrls: ['./ingredient.component.scss']
})
export class IngredientComponent implements OnInit {
  @Input() ingredient!: Ingredient;
  
  constructor() { }

  ngOnInit(): void {
  }

}
