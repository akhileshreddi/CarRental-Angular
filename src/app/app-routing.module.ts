import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { PlaceComponent } from './components/place/place.component';
import { HomepageComponent } from './components/homepage/homepage.component';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { LoginComponent } from './components/login/login.component';
import { CarsPageComponent } from './components/cars-page/cars-page.component';
import { BookingPageComponent } from './components/booking-page/booking-page.component';



const Route:Routes = [
  {path:'',redirectTo:'start-page',pathMatch:'full'},
  {path:'start-page', component: LandingPageComponent},
  {path:'Login', component:LoginComponent},
  {path:'home', component:HomepageComponent},
  {path:'select-place', component:PlaceComponent},
  {path:'cars-list',component: CarsPageComponent},
  {path:'header', component:HeaderComponent},
  {path:'booking-page/:id',component:BookingPageComponent}

]

@NgModule({
  imports: [RouterModule.forRoot(Route)],
  exports: [RouterModule]
})
export class AppRoutingModule { 

}
