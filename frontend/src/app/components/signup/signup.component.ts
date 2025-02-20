import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  imports: [ReactiveFormsModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent {
  signupForm = new FormGroup({
    email: new FormControl("", [Validators.required, Validators.email]),
    password: new FormControl("", [Validators.required, Validators.minLength(8)]),
    city: new FormControl("", [Validators.required]),
    postal_code: new FormControl("", [Validators.required]),
    street_address: new FormControl("", [Validators.required])
  });

  constructor (private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.authService.isAuthenticated().subscribe((authenticated) => {
      if (authenticated.status) {
        this.router.navigateByUrl('/');
      }
    });
  }

  onSubmit() {
    if (this.signupForm.valid) {
      const { email, password, city, postal_code, street_address } = this.signupForm.value;
      this.authService.signup(email!, password!, city!, postal_code!, street_address!).subscribe({
        next: (res) => {
          window.location.reload();
        },
        error: (err) => {
          alert(err.error.message);
        }
      });
    }
  }
}
