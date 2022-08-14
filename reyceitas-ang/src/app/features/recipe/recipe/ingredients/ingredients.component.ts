import { Component, Input, OnInit } from '@angular/core';
import { Ingredient } from '@models/recipe/ingredient.model';

@Component({
  selector: 'app-ingredients',
  templateUrl: './ingredients.component.html',
  styleUrls: ['./ingredients.component.scss']
})
export class IngredientsComponent implements OnInit {
  @Input() ingredients!: Ingredient[];

  doneIngredients: boolean[] = [];
  
  constructor() { }

  ngOnInit(): void {
    for(let i = 0; i < this.ingredients.length; i++) {
      this.doneIngredients[i] = false;
    }
  }

}
