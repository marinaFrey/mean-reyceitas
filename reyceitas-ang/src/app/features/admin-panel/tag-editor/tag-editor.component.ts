import { Component, OnInit } from '@angular/core';
import { Tag } from '@models/recipe/recipe.model';
import { TagService } from '@services/tag.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-tag-editor',
  templateUrl: './tag-editor.component.html',
  styleUrls: ['./tag-editor.component.scss'],
  providers: [TagService]
})
export class TagEditorComponent implements OnInit {

  allTags$: Observable<Tag[]> = this.tagService.getTags();

  constructor(private tagService: TagService) { }

  ngOnInit(): void {
  }

}
