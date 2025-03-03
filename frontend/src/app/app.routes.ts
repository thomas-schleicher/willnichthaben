import { Routes } from '@angular/router';

import { RetailComponent } from './pages/retail/retail.component';
import { VehicleComponent } from './pages/vehicle/vehicle.component';
import { ChatComponent } from './pages/chat/chat.component';
import { AccountComponent } from './pages/account/account.component';
import { ListingFormParentComponent } from './pages/listing-form-parent/listing-form-parent.component';

import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { ListingComponent } from './components/listing/listing.component';
import {RealEstateComponent} from './pages/real-estate/real-estate.component';


export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'retail', component: RetailComponent },
  { path: 'real-estate', component: RealEstateComponent },
  { path: 'vehicles', component: VehicleComponent },
  { path: 'listing/:id', component: ListingComponent },
  { path: 'chat', component: ChatComponent },
  { path: 'chat/:listing_id', component: ChatComponent },
  { path: 'account', component: AccountComponent },
  { path: 'listings/create', component: ListingFormParentComponent },
  { path: 'listings/modify/:listing_id', component: ListingFormParentComponent }
];
