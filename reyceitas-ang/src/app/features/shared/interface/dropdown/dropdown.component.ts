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
  autocompleteInput: FormControl;

  constructor() {
    this.autocompleteInput = new FormControl('');
  }

  ngOnInit() {
    if(this.formControl.value) this.autocompleteInput.setValue(this.formControl.value)
    this.filteredOptions = this.autocompleteInput?.valueChanges
      .pipe(
        startWith(''),
        map(val => this.filter(val))
      );
  }

  getName(item: any) {
    if(!this.displayProperty) this.displayProperty = 'name';
    return item?.[this.displayProperty];
  }

  filter(val: any): any[] {
  
    if(val[this.displayProperty]) {
      this.formControl.setValue(val)
      return [val];
    }
    return this.options.filter(option =>
      option[this.displayProperty].toLowerCase().indexOf(val?.toLowerCase()) === 0).slice(0,100);
  }
}
