import { NgFor, NgIf } from '@angular/common';
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
import { ListingPreviewComponent } from "../../components/listing-preview/listing-preview.component";
import { ListingService } from '../../service/listing.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-account',
  imports: [
    NgIf,
    NgFor,
    MatCardModule,
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    LoginComponent,
    ListingPreviewComponent
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

  listings: any[] = [];

  constructor(private userService: UserService, private authService: AuthService, private listingService: ListingService, private router: Router) {}

  ngOnInit() {
    this.authService.isAuthenticated().subscribe((status) => {
      this.authenticated = status.status;
    });

    this.listingService.getUserListings().subscribe((listings) => {
      this.listings = listings;
    })
  }

  changePassword() {
    if (this.passwordForm.valid) {
      const { password } = this.passwordForm.value;
      if (!password) return;
      this.userService
        .changePassword(password)
        .subscribe(() => {
          this.ngOnInit();
        });
    }
  }

  changeAddress() {
    if (this.addressForm.valid) {
      const { city, street_address, postal_code } = this.addressForm.value;
      if (city && street_address && postal_code) {
        this.userService.changeAddress(city, postal_code, street_address).subscribe(() => {
          this.ngOnInit();
        });
      }
    }
  }
  
  deleteListing(listingID: string | number) {
    const id = Number(listingID);
    if (isNaN(id)) return;
    this.listingService.deleteListing(id).subscribe(() => {
      this.ngOnInit();
    })
  }

  modifyListing(listingID: string | number) {
    const id = Number(listingID);
    if (isNaN(id)) return;
    this.router.navigate(["listings/modify/" + id.toString()]);
  }

  createListing() {
    this.router.navigate(["listings/create"]);
  }
}
