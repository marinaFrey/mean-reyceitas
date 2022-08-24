import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { Tag } from '@models/recipe/recipe.model';
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

  constructor(private tagService: TagService, private fb: FormBuilder) { 
  }

  ngOnInit(): void {
    this.getTags();
  }

  getFormGroup(tag: any) {
    return tag as FormGroup;
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
