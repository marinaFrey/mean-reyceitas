import { Component, OnInit } from '@angular/core';
import { AuthService } from '@services/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  user$ = this.authService.getUser();

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
  }

}
