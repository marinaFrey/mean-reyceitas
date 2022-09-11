import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { RecipeGroupAccess, UserGroup } from '@models/user/user-group.model';
import { UserManagementService } from '@services/user-management.service';
import { map, take } from 'rxjs';

@Component({
  selector: 'app-permission-form',
  templateUrl: './permission-form.component.html',
  styleUrls: ['./permission-form.component.scss']
})
export class PermissionFormComponent implements OnInit, OnChanges {
  @Input() isPublic: boolean = false;
  @Input() recipeId: number | null = null;
  @Input() form!: FormGroup;
  
  userGroupsFormArray: FormArray = this.fb.array([]);

  constructor(private userService: UserManagementService,
              private fb: FormBuilder) { }

  ngOnChanges(changes: SimpleChanges): void {
    if(changes['isPublic'].currentValue != changes['isPublic'].previousValue) {
      this.setPublicVisibility();
    }
  }

  ngOnInit(): void {
    this.getUserGroups();
  }

  getFormGroup(userGroup: any) {
    return userGroup as FormGroup;
  }

  canViewChecked(checked: boolean, userGroupForm: FormGroup) {
    if(!checked) {
      userGroupForm.get('canEdit')?.setValue(false);
    }
  }

  canEditChecked(checked: boolean, userGroupForm: FormGroup) {
    if(checked) {
      userGroupForm.get('canView')?.setValue(true);
    }
  }

  private getUserGroups(): void {
    this.userService.getUserGroupAccess(this.recipeId).pipe(
      take(1),
      map(userGroups => {
        this.userService.populateUserGroupVisibilityForm(userGroups, this.userGroupsFormArray)
        this.setPublicVisibility();
      })
    ).subscribe()
  }

  private setPublicVisibility() {
    for (let userGroup of this.userGroupsFormArray.controls) {
      if (userGroup instanceof FormGroup) {
        if(this.isPublic) {
          userGroup.get('canView')?.setValue(true);
          userGroup.get('canView')?.disable();
        } else {
          userGroup.get('canView')?.enable();
        }
      }
   }
  }

}
