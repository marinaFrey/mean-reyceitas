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

  @Input() form!: FormGroup;
  @Input() formControlName!: string;
  @Input() displayProperty: string = 'name';

  filteredOptions!: Observable<any> | undefined;

  constructor() { }

  ngOnInit() {
    this.filteredOptions = this.form.get(this.formControlName)?.valueChanges
      .pipe(
        startWith(''),
        map(val => this.filter(val))
      );
  }

  get formControl() {
    console.log(this.form.get(this.formControlName))
    return this.form.get(this.formControlName) as FormControl
  }

  getName(item: any) {
    return item?.[this.displayProperty];
  }

  filter(val: string): string[] {
    return this.options.filter(option =>
      option[this.displayProperty].toLowerCase().indexOf(val.toLowerCase()) === 0);
  }
}
