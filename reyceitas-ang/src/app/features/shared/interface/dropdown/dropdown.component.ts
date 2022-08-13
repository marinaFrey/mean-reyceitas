import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { map, Observable, startWith } from 'rxjs';

@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.scss']
})
export class DropdownComponent implements OnInit {
  @Input() label: string | undefined;
  @Input() placeholder: string = '';
  @Input() options: any[] = [];

  @Input() formControl!: FormControl;
  @Input() displayProperty: string = 'name';

  filteredOptions!: Observable<any> | undefined;

  constructor() { }

  ngOnInit() {
    this.filteredOptions = this.formControl?.valueChanges
      .pipe(
        startWith(''),
        map(val => this.filter(val))
      );
  }

  getName(item: any) {
    return item?.[this.displayProperty];
  }

  filter(val: any): any[] {
    if(val[this.displayProperty]) this.formControl.setValue(val)
    return this.options.filter(option =>
      option[this.displayProperty].toLowerCase().indexOf(val?.toLowerCase()) === 0);
  }
}
