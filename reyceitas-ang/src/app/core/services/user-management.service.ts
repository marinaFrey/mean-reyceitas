import { Injectable } from '@angular/core';
import { FormArray, FormBuilder, Validators } from '@angular/forms';
import { AUTH_ENDPOINT } from '@constants/endpoints.constant';
import { User } from '@models/user.model';
import { Observable } from 'rxjs';
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
}