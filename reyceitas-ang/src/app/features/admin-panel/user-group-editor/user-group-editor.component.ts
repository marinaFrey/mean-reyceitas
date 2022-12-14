import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { UserGroup } from '@models/user/user-group.model';
import { AlertService } from '@services/alert.service';
import { UserManagementService } from '@services/user-management.service';
import { catchError, forkJoin, map, take } from 'rxjs';

@Component({
  selector: 'app-user-group-editor',
  templateUrl: './user-group-editor.component.html',
  styleUrls: ['./user-group-editor.component.scss']
})
export class UserGroupEditorComponent implements OnInit {
  userGroups: UserGroup[] = [];

  userGroupsFormArray: FormArray = this.fb.array([]);

  constructor(private userService: UserManagementService,
              private fb: FormBuilder,
              private alert: AlertService) { }

  ngOnInit(): void {
    this.getUserGroups();
  }

  submit(): void {
    if(this.userGroupsFormArray.invalid) {
      this.alert.error('invalid form');
      this.userGroupsFormArray.markAllAsTouched();
      return;
    }
    let changes = [];
    for (let userGroup of this.userGroupsFormArray.controls) {
      if (userGroup instanceof FormGroup) {
        const value = userGroup?.value;
        if(value.hasChanges) {
          if(!value._id)
            changes.push(this.userService.newUserGroup(value));
          else
            changes.push(this.userService.editUserGroup(value));
        }
      }
   }

   if(changes.length) {
    forkJoin(changes)
      .pipe(take(1))
      .subscribe((changes) => {
        this.alert.success('changes saved')
        this.getUserGroups();
      });
   }
  }

  deleteGroup(userGroup: FormGroup, formArrayIndex: number) {
    const value = userGroup?.value;
    this.userGroupsFormArray.removeAt(formArrayIndex)
    if(value?._id) {
      this.userService.deleteUserGroup(value._id)
        .subscribe(() => {
          this.alert.success(`group '${value.name}' deleted permanently`);
        })
    }
    else {
      this.alert.success(`new group '${value.name}' was removed`)
    }
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

  private getUserGroups(): void {
    this.userGroupsFormArray = this.fb.array([]);
    this.userService.getUserGroups().pipe(
      take(1),
      map(userGroups => {
        this.userService.populateUserGroupForm(userGroups, this.userGroupsFormArray)
      })
    ).subscribe()
  }

}
