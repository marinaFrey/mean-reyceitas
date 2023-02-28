import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { RecipeGroupAccess } from '@models/user/user-group.model';

@Component({
  selector: 'app-access-form',
  templateUrl: './access-form.component.html',
  styleUrls: ['./access-form.component.scss']
})
export class AccessFormComponent implements OnInit {
  @Input() form!: FormGroup;
  @Input() groupAccess: RecipeGroupAccess[] | undefined;
  
  constructor() { }

  ngOnInit(): void {
  }

}
