import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Instruction } from '@models/recipe/instruction.model';

@Component({
  selector: 'app-instructions-form',
  templateUrl: './instructions-form.component.html',
  styleUrls: ['./instructions-form.component.scss']
})
export class InstructionsFormComponent implements OnInit {
  @Input() form!: FormGroup;
  @Input() instructions: Instruction[] | undefined;
  
  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    if(this.instructions)
      this.getInstructions(this.instructions);
  }

  get instructionsFormArray() {
    return this.form?.controls["instructions"] as FormArray;
  }

  addInstruction(instruction?: Instruction) {
    const instructionForm = this.formBuilder.group({
      description: [instruction?.description ?? '', Validators.required]
    });

    this.instructionsFormArray.push(instructionForm);
  }

  deleteInstruction(index: number) {
    this.instructionsFormArray.removeAt(index);
  }

  getInstructionFormGroup(instruction: any) {
    return instruction as FormGroup;
  }

  private getInstructions(instructions: Instruction[]) {
    instructions.forEach(instruction => {
      this.addInstruction(instruction);
    });
  }

}
