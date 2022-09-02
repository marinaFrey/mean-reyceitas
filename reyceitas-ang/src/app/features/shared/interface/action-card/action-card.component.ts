import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-action-card',
  templateUrl: './action-card.component.html',
  styleUrls: ['./action-card.component.scss']
})
export class ActionCardComponent implements OnInit {
  @Input() imageUrl: string | undefined;
  @Input() description: string | undefined;
  @Input() buttonIcon: string | undefined;
  @Input() buttonText: string | undefined;
  @Input() buttonColor: string = 'primary';
  @Output() clicked: EventEmitter<any> = new EventEmitter<any>();

  constructor() { }

  ngOnInit(): void {
  }

}
