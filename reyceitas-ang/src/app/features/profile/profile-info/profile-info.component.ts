import { Component, Input, OnInit } from '@angular/core';
import { User } from '@models/user.model';

@Component({
  selector: 'app-profile-info',
  templateUrl: './profile-info.component.html',
  styleUrls: ['./profile-info.component.scss']
})
export class ProfileInfoComponent implements OnInit {

  @Input() user!: User;

  constructor() { }

  ngOnInit(): void {
  }

}
