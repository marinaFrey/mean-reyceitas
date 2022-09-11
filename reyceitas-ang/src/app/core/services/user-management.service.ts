import { Injectable } from '@angular/core';
import { FormArray, FormBuilder, Validators } from '@angular/forms';
import { AUTH_ENDPOINT } from '@constants/endpoints.constant';
import { RecipeAccess, RecipeGroupAccess, UserGroup } from '@models/user/user-group.model';
import { User } from '@models/user/user.model';
import { Observable, of } from 'rxjs';
import { ApiService } from './api.service';

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
      return of( [
        {_id: 'df5645df', name: 'familia pritsch', createdBy: 'fulaninho', 
        recipeWriteAccess: true,groupWriteAccess: true},
        {_id: 'df5645df', name: 'familia rey', createdBy: 'fulaninho', 
        recipeWriteAccess: false,groupWriteAccess: false},
        {_id: 'df5645df', name: 'amigos', createdBy: 'fulaninho', 
        recipeWriteAccess: true,groupWriteAccess: false},
        {_id: 'df5645df', name: 'conhecidos', createdBy: 'fulaninho', 
        recipeWriteAccess: true,groupWriteAccess: true},
        {_id: 'df5645df', name: 'creeps', createdBy: 'fulaninho', 
        recipeWriteAccess: false,groupWriteAccess: true}
      ])
    }

    getUserGroupAccess(recipeId: number | null): Observable<RecipeGroupAccess[]> {
      return of( [
        {_id: 'df5645df', name: 'familia pritsch', access: RecipeAccess.CAN_VIEW},
        {_id: 'df5645df', name: 'familia rey', access: RecipeAccess.CAN_VIEW},
        {_id: 'df5645df', name: 'amigos', access: RecipeAccess.CAN_VIEW},
        {_id: 'df5645df', name: 'conhecidos', access: RecipeAccess.CAN_VIEW},
        {_id: 'df5645df', name: 'creeps', access: RecipeAccess.CAN_VIEW}
      ])
    }

    addUser(user: User, formArray: FormArray) {
        const userForm = this.formBuilder.group({
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

      addUserGroupVisibility(userGroup: RecipeGroupAccess | null, formArray: FormArray) {
        const userForm = this.formBuilder.group({
          _id: [userGroup?._id],
          name: [userGroup?.name, Validators.required],
          canView: [userGroup?.canView ?? false],
          canEdit: [userGroup?.canEdit ?? false]
        });
    
        formArray.push(userForm);
      }
    
      populateUserGroupVisibilityForm(userGroups: RecipeGroupAccess[], formArray: FormArray) {
        userGroups.forEach(userGroup => {
          this.addUserGroupVisibility(userGroup, formArray);
        });
      }
}