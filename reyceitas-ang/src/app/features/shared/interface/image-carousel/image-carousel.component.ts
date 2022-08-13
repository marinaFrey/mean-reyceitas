import { Component, Input, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-image-carousel',
  templateUrl: './image-carousel.component.html',
  styleUrls: ['./image-carousel.component.scss']
})
export class ImageCarouselComponent implements OnInit {
  @Input() images!: string[];

  shownImageIndex: number = 0;

  constructor() { }

  ngOnInit(): void {
  }

  changeSelectedImage(index: number): void {
    this.shownImageIndex = index;
  }

  getImageUrl(image: string): string {
    return `${environment.apiUrl}/uploads/${image}`
  }

}
