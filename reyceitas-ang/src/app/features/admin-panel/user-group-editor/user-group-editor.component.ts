import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { UserGroup } from '@models/user/user-group.model';
import { UserManagementService } from '@services/user-management.service';
import { map, take } from 'rxjs';

@Component({
  selector: 'app-user-group-editor',
  templateUrl: './user-group-editor.component.html',
  styleUrls: ['./user-group-editor.component.scss']
})
export class UserGroupEditorComponent implements OnInit {
  userGroups: UserGroup[] = [];

  userGroupsFormArray: FormArray = this.fb.array([]);

  constructor(private userService: UserManagementService,
              private fb: FormBuilder) { }

  ngOnInit(): void {
    this.userService.getUserGroups().pipe(
      take(1),
      map(userGroups => {
        this.userService.populateUserGroupForm(userGroups, this.userGroupsFormArray)
      })
    ).subscribe()
  }

  getFormGroup(userGroup: any) {
    return userGroup as FormGroup;
  }

  setHasChanges(userGroup: FormGroup): void {
    userGroup.get('hasChanges')?.setValue(true);
  }

  addGroup(): void {
    this.userService.addUserGroup(null,this.userGroupsFormArray);
  }

}
