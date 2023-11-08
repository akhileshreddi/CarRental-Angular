import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';

import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HomepageComponent } from './components/homepage/homepage.component';
import { RouterModule, Routes } from '@angular/router';
import { PlaceComponent } from './components/place/place.component';
import { CarService } from './services/cars.service';
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideAuth,getAuth } from '@angular/fire/auth';
import { provideDatabase,getDatabase } from '@angular/fire/database';
import { provideFirestore,getFirestore } from '@angular/fire/firestore';
import { AuthService } from './shared/auth.service';
import {AngularFireModule} from '@angular/fire/compat';
import { SliderHeadingComponent } from './components/slider-heading/slider-heading.component';
import { HeaderComponent } from './components/header/header.component';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { DatabaseService } from './shared/database.service';
import { HttpClientModule } from '@angular/common/http';
import { CarsPageComponent } from './components/cars-page/cars-page.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCardModule } from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field'
import {MatIconModule} from '@angular/material/icon';
import { BookingPageComponent } from './components/booking-page/booking-page.component';
import { UserNotFoundComponent } from './components/user-not-found/user-not-found.component';
import { HoverEffectDirective } from './directives/hover-effect.directive';





@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    HomepageComponent,
    PlaceComponent,
    SliderHeadingComponent,
    HeaderComponent,
    LandingPageComponent,
    CarsPageComponent,
    BookingPageComponent,
    UserNotFoundComponent,
    HoverEffectDirective,
    
    
    
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    provideDatabase(() =>getDatabase()),
    AngularFireDatabaseModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatFormFieldModule,
    MatIconModule
  
    
  ],
  providers: [CarService, AuthService, DatabaseService],
  bootstrap: [AppComponent]
})
export class AppModule { }
