import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { RecipeAccess, RecipeGroupAccess, UserGroup } from '@models/user/user-group.model';
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
  @Input() groupAccess: RecipeGroupAccess[] | undefined;

  constructor(private userService: UserManagementService,
              private fb: FormBuilder) { }

  ngOnChanges(changes: SimpleChanges): void {
    if(changes['isPublic'].currentValue != changes['isPublic'].previousValue) {
      this.setPublicVisibility();
    }
  }

  ngOnInit(): void {
    //this.getUserGroups();    
    if(this.groupAccess)
      this.getGroupAccess(this.groupAccess);
  }

  get userGroupsFormArray() {
    return this.form?.controls["groupAccess"] as FormArray;
  }

  getFormGroup(userGroup: any) {
    return userGroup as FormGroup;
  }

  canViewChecked(checked: boolean, userGroupForm: FormGroup) {
    if(!checked) {
      userGroupForm.get('canEdit')?.setValue(false);
    }
    this.updateAccessLevel(userGroupForm);
  }

  canEditChecked(checked: boolean, userGroupForm: FormGroup) {
    if(checked) {
      userGroupForm.get('canView')?.setValue(true);
    }
    this.updateAccessLevel(userGroupForm);
  }
  private updateAccessLevel(userGroupForm: FormGroup){
    const canView = userGroupForm.get('canView')?.value;
    const canEdit = userGroupForm.get('canEdit')?.value;
    if(canEdit){
      userGroupForm.get('accessLevel')?.setValue(RecipeAccess.CAN_EDIT);
    } else if(canView){
      userGroupForm.get('accessLevel')?.setValue(RecipeAccess.CAN_VIEW);
    } else {
      userGroupForm.get('accessLevel')?.setValue(RecipeAccess.NO_ACCESS);
    }
  }
  private getGroupAccess(groupAccess: RecipeGroupAccess[]): void {
      this.userService.populateUserGroupVisibilityForm(groupAccess, this.userGroupsFormArray)
      this.setPublicVisibility();
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
