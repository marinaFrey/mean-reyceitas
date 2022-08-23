import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Tag } from '@models/recipe/recipe.model';
import { RecipeService } from '@services/recipe.service';
import { TagService } from '@services/tag.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-tags-form',
  templateUrl: './tags-form.component.html',
  styleUrls: ['./tags-form.component.scss'],
  providers: [TagService]
})
export class TagsFormComponent implements OnInit {
  @Input() form!: FormGroup;
  @Input() tags: Tag[] | undefined;

  allTags$: Observable<Tag[]> = this.tagService.getTags();
  
  constructor(private formBuilder: FormBuilder,
              private tagService: TagService) { }

  ngOnInit(): void {
    if(this.tags)
      this.tagService.populateTagsForm(this.tags, this.tagsFormArray);
  }

  get tagsFormArray() {
    return this.form?.controls["tags"] as FormArray;
  }

  toggleTag(tag: Tag) {
    const selectedTag = this.tagsFormArray.value.find((t: Tag) => t._id == tag._id)
    if(!selectedTag) this.tagService.addTag(tag,this.tagsFormArray);
    else this.tagService.deleteTag(tag,this.tagsFormArray);
  }

  getClass(tag: Tag) {
    const selectedTag = this.tagsFormArray.value.find((t: Tag) => t._id == tag._id)
    if(!selectedTag) return 'unselected';
    else return 'selected'
  }

  getTagsFormGroup(tag: any) {
    return tag as FormGroup;
  }
}
