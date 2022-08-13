import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-difficulty',
  templateUrl: './difficulty.component.html',
  styleUrls: ['./difficulty.component.scss']
})
export class DifficultyComponent implements OnInit {
  @Input() difficulty!: number;

  markers: boolean[] = [];

  difficultyMap = [ 'Very Easy', 'Easy', 'Normal', 'Hard', 'Very Hard']

  constructor() { }

  ngOnInit(): void {
    this.setDifficultyMarkers();
  }

  private setDifficultyMarkers() {
    for(let i = 1; i <= 5; i++) {
      this.markers.push(this.difficulty >= i ? true : false)
    }
  }

}
