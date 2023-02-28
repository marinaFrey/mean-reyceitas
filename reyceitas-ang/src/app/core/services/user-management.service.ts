import { Injectable } from '@angular/core';
import { FormArray, FormBuilder, Validators } from '@angular/forms';
import { AUTH_ENDPOINT, USERGROUPS_ENDPOINT } from '@constants/endpoints.constant';
import { RecipeAccess, RecipeGroupAccess, UserGroup } from '@models/user/user-group.model';
import { User } from '@models/user/user.model';
import { Observable, of } from 'rxjs';
import { ApiService } from './api.service';
import { group } from '@angular/animations';
import { RequestInterceptor } from '../interceptors/http.interceptor';

@Injectable({
  providedIn: 'root'
})
export class UserManagementService {
    constructor(private api: ApiService,
                private formBuilder: FormBuilder) {}

    getUsers(): Observable<User[]> {
        return this.api.get<User[]>(`${AUTH_ENDPOINT}/users`)
    }

    getUserGroups(): Observable<UserGroup[]> {
      return this.api.get<UserGroup[]>(`${USERGROUPS_ENDPOINT}`);
    }

    editUserGroup(userGroup: UserGroup): Observable<UserGroup> {
      return this.api.put<UserGroup>(`${USERGROUPS_ENDPOINT}/edit/${userGroup._id}`, userGroup)
    }

    newUserGroup(userGroup: UserGroup): Observable<UserGroup> {
      return this.api.post<UserGroup>(`${USERGROUPS_ENDPOINT}/new`, userGroup)
    }

    deleteUserGroup(index: string): Observable<UserGroup> {
      return this.api.delete<UserGroup>(`${USERGROUPS_ENDPOINT}/delete/${index}`)
    }

    //getUserGroupAccess(recipeId: number | null): Observable<RecipeGroupAccess[]> {
   // }

    addUser(user: User, formArray: FormArray) {
        const userForm = this.formBuilder.group({
          _id: [user?._id],
          profilePicture: [user?.profilePicture],
          fullName: [`${user?.firstName} ${user?.lastName}`],
          email: [user?.email],
          groups: []
        });
    
        formArray.push(userForm);
      }
    
      populateUserForm(users: User[], formArray: FormArray) {
        users.forEach(user => {
          this.addUser(user, formArray);
        });
      }

      addUserGroup(userGroup: UserGroup | null, formArray: FormArray) {
        const userForm = this.formBuilder.group({
          _id: [userGroup?._id],
          name: [userGroup?.name, Validators.required],
          users: [],
          recipeWriteAccess: [userGroup?.recipeWriteAccess],
          groupWriteAccess: [userGroup?.groupWriteAccess],
          hasChanges: [false]
        });
    
        formArray.push(userForm);
      }
    
      populateUserGroupForm(userGroups: UserGroup[], formArray: FormArray) {
        userGroups.forEach(userGroup => {
          this.addUserGroup(userGroup, formArray);
        });
      }

      addUserGroupVisibility(groupAccess: RecipeGroupAccess | null, formArray: FormArray) {
        const recipeGroupAccessForm = this.formBuilder.group({
          group: this.formBuilder.group({
            _id: [groupAccess?.group?._id],
            name: [groupAccess?.group?.name, Validators.required],
          }),
          accessLevel: [groupAccess?.accessLevel],
          canView: [(groupAccess?.accessLevel == RecipeAccess.CAN_VIEW || groupAccess?.accessLevel == RecipeAccess.CAN_EDIT) ?? false],
          canEdit: [groupAccess?.accessLevel == RecipeAccess.CAN_EDIT ?? false ]
        });
    
        formArray.push(recipeGroupAccessForm);
      }
    
      populateUserGroupVisibilityForm(userGroups: RecipeGroupAccess[], formArray: FormArray) {
        userGroups.forEach(userGroup => {
          this.addUserGroupVisibility(userGroup, formArray);
        });
      }
}