import { Component, Input, OnInit } from '@angular/core';
import { Tag } from '@models/recipe/recipe.model';

@Component({
  selector: 'app-tags',
  templateUrl: './tags.component.html',
  styleUrls: ['./tags.component.scss']
})
export class TagsComponent implements OnInit {
  @Input() tags: Tag[] = [];

  constructor() { }

  ngOnInit(): void {}

}
