import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { RetailComponent } from './pages/retail/retail.component';
import { RealestateComponent } from './pages/realestate/realestate.component';
import { VehicleComponent } from './pages/vehicle/vehicle.component';

export const routes: Routes = [
    { path: "login", component: LoginComponent },
    { path: "signup", component: SignupComponent},
    { path: "retail", component: RetailComponent},
    { path: "real-estate", component: RealestateComponent },
    { path: "vehicles", component: VehicleComponent },
];
