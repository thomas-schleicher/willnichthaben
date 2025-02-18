import { Component } from '@angular/core';
import { AuthService } from '../../service/auth.service';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-header',
  imports: [NgIf],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  
  authStatus!: boolean;

  constructor (private authService: AuthService) {}

  ngOnInit() {
    this.authService.isAuthenticated().subscribe((status => {
      this.authStatus = status.status;
    }));
  }

  logout() {
    this.authService.logout().subscribe();
    this.authStatus = false;
  }
}
