import { Component, OnInit } from '@angular/core';
import { User } from '@models/user/user.model';
import { UserManagementService } from '@services/user-management.service';
import { map, take } from 'rxjs';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.scss'],
  providers: [UserManagementService]
})
export class UserManagementComponent implements OnInit {

  users: User[] = [];
  groups: any[] = [];

  constructor(private userService: UserManagementService) { }

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers(): void {
    this.userService.getUsers().pipe(
      take(1),
      map((users => this.users = users))
    ).subscribe()
  }

}
