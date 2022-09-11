import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { RecipeGroupAccess, UserGroup } from '@models/user/user-group.model';
import { UserManagementService } from '@services/user-management.service';
import { map, take } from 'rxjs';

@Component({
  selector: 'app-permission-form',
  templateUrl: './permission-form.component.html',
  styleUrls: ['./permission-form.component.scss']
})
export class PermissionFormComponent implements OnInit {
  @Input() form!: FormGroup;
  @Input() userGroupsVisibility: RecipeGroupAccess[] = [];
  // this should come prepopulated with all user groups. 
  // if this is a new recipe, we should get all user groups.
  
  userGroupsFormArray: FormArray = this.fb.array([]);

  constructor(private userService: UserManagementService,
              private fb: FormBuilder) { }

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
    if(this.userGroupsVisibility?.length) {
      this.userService.populateUserGroupVisibilityForm(this.userGroupsVisibility, this.userGroupsFormArray);
    }
    else {
      this.userService.getUserGroupAccess().pipe(
        take(1),
        map(userGroups => {
          this.userService.populateUserGroupVisibilityForm(userGroups, this.userGroupsFormArray)
        })
      ).subscribe()
    }
  }

}
