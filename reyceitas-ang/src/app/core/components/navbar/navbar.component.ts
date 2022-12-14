import { Component, OnInit } from '@angular/core';
import { AuthService } from '@services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  isLoggedIn$ = this.authService.isLoggedIn();
  user$ = this.authService.getUser();

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
  }

  logout(): void {
    this.authService.signOut();
  }
}
