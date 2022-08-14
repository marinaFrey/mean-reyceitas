import { Component, Input, OnInit } from '@angular/core';
import { Ingredient } from '@models/recipe/ingredient.model';

@Component({
  selector: 'app-ingredients',
  templateUrl: './ingredients.component.html',
  styleUrls: ['./ingredients.component.scss']
})
export class IngredientsComponent implements OnInit {
  @Input() ingredients!: Ingredient[];
  
  constructor() { }

  ngOnInit(): void {
  }

}
