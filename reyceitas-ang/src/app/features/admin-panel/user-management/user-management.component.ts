import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { UserGroup } from '@models/user/user-group.model';
import { User } from '@models/user/user.model';
import { UserManagementService } from '@services/user-management.service';
import { forkJoin, map, take } from 'rxjs';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.scss'],
  providers: [UserManagementService]
})
export class UserManagementComponent implements OnInit {

  users: User[] = [];
  usersFormArray: FormArray = this.fb.array([]);
  groups: UserGroup[] = [];

  constructor(private userService: UserManagementService,
              private fb: FormBuilder,) { }

  ngOnInit(): void {
    this.getUsers();
  }

  submit(): void {

  }

  deactivateUser(): void {
    
  }

  getFormGroup(userGroup: any) {
    return userGroup as FormGroup;
  }

  private getUsers(): void {
    forkJoin({
      users: this.userService.getUsers(),
      groups: this.userService.getUserGroups()
    }).pipe(take(1)).subscribe((({users, groups}) => {
      this.userService.populateUserForm(users, this.usersFormArray)
      this.groups = groups;
    }))
  }

}
