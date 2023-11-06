import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { PlaceComponent } from './components/place/place.component';
import { HomepageComponent } from './components/homepage/homepage.component';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { LoginComponent } from './components/login/login.component';
import { CarsPageComponent } from './components/cars-page/cars-page.component';
import { BookingPageComponent } from './components/booking-page/booking-page.component';
import { UserNotFoundComponent } from './components/user-not-found/user-not-found.component';
import { AngularFireAuthGuard } from '@angular/fire/compat/auth-guard';
import { hasCustomClaim, redirectUnauthorizedTo, redirectLoggedInTo } from '@angular/fire/compat/auth-guard';


const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['/Login']);

const Route:Routes = [
  {path:'',redirectTo:'start-page',pathMatch:'full'},
  {path:'start-page', component: LandingPageComponent},
  {path:'Login', component:LoginComponent},
  {path:'home', component:HomepageComponent},
  {path:'select-place', component:PlaceComponent},
  {path:'cars-list',component: CarsPageComponent, canActivate: [AngularFireAuthGuard], data: { authGuardPipe: redirectUnauthorizedToLogin }},
  {path:'header', component:HeaderComponent},
  {path:'booking-page/:id',component:BookingPageComponent, canActivate: [AngularFireAuthGuard], data: { authGuardPipe: redirectUnauthorizedToLogin }},
  {path:'**', component:UserNotFoundComponent}

]

@NgModule({
  imports: [RouterModule.forRoot(Route)],
  exports: [RouterModule]
})
export class AppRoutingModule { 

}
