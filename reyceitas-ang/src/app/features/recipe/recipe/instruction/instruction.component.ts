import { Component, Input, OnInit } from '@angular/core';
import { Instruction } from '@models/recipe/instruction.model';

@Component({
  selector: 'app-instruction',
  templateUrl: './instruction.component.html',
  styleUrls: ['./instruction.component.scss']
})
export class InstructionComponent implements OnInit {
  @Input() instruction!: Instruction;
  
  constructor() { }

  ngOnInit(): void {
  }

}
