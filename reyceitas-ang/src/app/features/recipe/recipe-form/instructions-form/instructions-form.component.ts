import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-instructions-form',
  templateUrl: './instructions-form.component.html',
  styleUrls: ['./instructions-form.component.scss']
})
export class InstructionsFormComponent implements OnInit {
  @Input() form!: FormGroup;
  
  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
  }

  get instructions() {
    return this.form?.controls["instructions"] as FormArray;
  }

  addInstruction() {
    const instructionForm = this.formBuilder.group({
      description: ['', Validators.required]
    });

    this.instructions.push(instructionForm);
  }

  deleteInstruction(index: number) {
    this.instructions.removeAt(index);
  }

  getInstructionFormGroup(instruction: any) {
    return instruction as FormGroup;
  }

}
