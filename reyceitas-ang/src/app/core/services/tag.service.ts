import { Injectable } from '@angular/core';
import { FormArray, FormBuilder, Validators } from '@angular/forms';
import { TAGS_ENDPOINT } from '@constants/endpoints.constant';
import { Tag } from '@models/recipe/recipe.model';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class TagService {

  constructor(private api: ApiService, 
            private formBuilder: FormBuilder,) { }

  getTags(): Observable<Tag[]> {
    return this.api.get(`${TAGS_ENDPOINT}`);
  }

  addTag(tag: Tag | null, tagsFormArray: FormArray) {
    const tagForm = this.formBuilder.group({
      _id: [tag?._id],
      name: [tag?.name, Validators.required],
      color: [tag?.color]
    });

    tagsFormArray.push(tagForm);
  }

  deleteTag(tag: Tag, tagsFormArray: FormArray) {
    const index = tagsFormArray.value.findIndex((t: Tag) => t._id == tag._id);
    tagsFormArray.removeAt(index);
  }

  populateTagsForm(tags: Tag[], tagsFormArray: FormArray) {
    tags.forEach(tag => {
      this.addTag(tag, tagsFormArray);
    });
  }
}
