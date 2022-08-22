import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Tag } from '@models/recipe/recipe.model';
import { RecipeService } from '@services/recipe.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-tags-form',
  templateUrl: './tags-form.component.html',
  styleUrls: ['./tags-form.component.scss']
})
export class TagsFormComponent implements OnInit {
  @Input() form!: FormGroup;
  @Input() tags: Tag[] | undefined;

  allTags$: Observable<Tag[]> = this.recipeService.getTags();
  
  constructor(private formBuilder: FormBuilder,
              private recipeService: RecipeService) { }

  ngOnInit(): void {
    if(this.tags)
      this.getTags(this.tags);
  }

  get tagsFormArray() {
    return this.form?.controls["tags"] as FormArray;
  }

  toggleTag(tag: Tag) {
    const selectedTag = this.tagsFormArray.value.find((t: Tag) => t._id == tag._id)
    if(!selectedTag) this.addTag(tag);
    else this.deleteTag(tag);
  }

  addTag(tag: Tag) {
    const tagForm = this.formBuilder.group({
      _id: [tag._id],
      name: [tag.name],
      color: [tag.color]
    });

    this.tagsFormArray.push(tagForm);
  }

  deleteTag(tag: Tag) {
    const index = this.tagsFormArray.value.findIndex((t: Tag) => t._id == tag._id);
    this.tagsFormArray.removeAt(index);
  }

  getClass(tag: Tag) {
    const selectedTag = this.tagsFormArray.value.find((t: Tag) => t._id == tag._id)
    if(!selectedTag) return 'unselected';
    else return 'selected'
  }

  getTagsFormGroup(tag: any) {
    return tag as FormGroup;
  }

  private getTags(tags: Tag[]) {
    tags.forEach(tag => {
      this.addTag(tag);
    });
  }



  /*
  onTagRemoved(topping: string) {
    const toppings = this.toppingsControl.value as string[];
    this.removeFirst(toppings, topping);
    //this.toppingsControl.setValue(toppings); // To trigger change detection
  }

  private removeFirst<T>(array: T[], toRemove: T): void {
    const index = array.indexOf(toRemove);
    if (index !== -1) {
      array.splice(index, 1);
    }
  }*/

}
