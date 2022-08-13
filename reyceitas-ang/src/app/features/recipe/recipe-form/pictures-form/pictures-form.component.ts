import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-pictures-form',
  templateUrl: './pictures-form.component.html',
  styleUrls: ['./pictures-form.component.scss']
})
export class PicturesFormComponent implements OnInit {
  @Input() form!: FormGroup;
  @Input() pictures: string[] | undefined;
  
  constructor() { }

  ngOnInit(): void {
    if(this.pictures)
      this.getPictures(this.pictures);
  }

  get picturesFormArray() {
    return this.form?.controls["pictures"] as FormArray;
  }

  addPicture(picture: string | null = null) {
    console.log(picture)
    this.picturesFormArray.push(new FormControl([picture]));
  }

  deletePicture(index: number) {
    this.picturesFormArray.removeAt(index);
  }

  private getPictures(pictures: string[]) {
    pictures.forEach(picture => {
      this.addPicture(picture);
    });
  }
}
