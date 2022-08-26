import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { Tag } from '@models/recipe/recipe.model';
import { AlertService } from '@services/alert.service';
import { TagService } from '@services/tag.service';
import { map, Observable, take } from 'rxjs';

@Component({
  selector: 'app-tag-editor',
  templateUrl: './tag-editor.component.html',
  styleUrls: ['./tag-editor.component.scss'],
  providers: [TagService]
})
export class TagEditorComponent implements OnInit {

  allTags$: Observable<Tag[]> = this.tagService.getTags();
  tagsFormArray: FormArray = this.fb.array([]);

  constructor(private tagService: TagService, 
              private alert: AlertService,
              private fb: FormBuilder) { 
  }

  ngOnInit(): void {
    this.getTags();
  }

  getFormGroup(tag: any) {
    return tag as FormGroup;
  }

  addTag(): void {
    this.tagService.addTag(null, this.tagsFormArray);
  }

  deleteTag(tagControl: FormGroup) {
    this.tagService.deleteTag(tagControl.value, this.tagsFormArray);
  }

  submit(): void {
    console.log(this.tagsFormArray)
    if(this.tagsFormArray.invalid) {
      this.tagsFormArray.markAllAsTouched();
      this.alert.error('Please fill all information')
      return;
    }
  }

  private getTags(): void {
    this.tagService.getTags().pipe(
      take(1),
      map(tags => {
        this.tagService.populateTagsForm(tags, this.tagsFormArray);
      })
    ).subscribe();
  }
}
