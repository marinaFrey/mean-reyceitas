import { Component, Input, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-image',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.scss']
})
export class ImageComponent implements OnInit {
  @Input() imageUrl: string | undefined;
  @Input() imageWidth: string | undefined;
  @Input() imageHeight: string | undefined;
  @Input() getFromServer: boolean = true;

  constructor() { }

  ngOnInit(): void {
  }

  getImageUrl(): string {
    if(!this.imageUrl) return 'assets/images/img-placeholder.jpg';

    if(this.getFromServer)
      return this.getServerImageUrl(this.imageUrl)

    return this.imageUrl;
  }

  getServerImageUrl(image: string): string {
    return `${environment.apiUrl}/uploads/${image}`
  }

}
