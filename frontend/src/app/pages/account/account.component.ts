import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { UserService } from '../../service/user.service';
import { AuthService } from '../../service/auth.service';
import { LoginComponent } from '../../components/login/login.component';

@Component({
  selector: 'app-account',
  imports: [
    NgIf,
    MatCardModule,
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    LoginComponent,
  ],
  templateUrl: './account.component.html',
  styleUrl: './account.component.scss',
})
export class AccountComponent {
  authenticated: any;
  passwordForm = new FormGroup({
    password: new FormControl("", [Validators.required, Validators.minLength(8)])
  });
  addressForm = new FormGroup({
    city: new FormControl("", [Validators.required]),
    postal_code: new FormControl("", [Validators.required]),
    street_address: new FormControl("", [Validators.required])
  });

  constructor(private userService: UserService, private authService: AuthService) {}

  ngOnInit() {
    this.authService.isAuthenticated().subscribe((status) => {
      this.authenticated = status.status;
    });    
  }

  changePassword() {
    if (this.passwordForm.valid) {
      const { password } = this.passwordForm.value;
      if (!password) return;
      this.userService
        .changePassword(password)
        .subscribe();
    }
  }

  changeAddress() {
    if (this.addressForm.valid) {
      const { city, street_address, postal_code } = this.addressForm.value;
      if (city && street_address && postal_code) {
        this.userService.changeAddress(city, postal_code, street_address).subscribe();
      }
    }
  }
}
