import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookingPageComponent } from './booking-page.component';
import { ActivatedRoute } from '@angular/router';
import { DatabaseService } from 'src/app/shared/database.service';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { AngularFireModule } from '@angular/fire/compat';
import { environment } from 'src/environments/environment';
import { HttpClientModule } from '@angular/common/http';
import { HeaderComponent } from '../header/header.component';
import { of } from 'rxjs';

describe('BookingPageComponent', () => {
  let component: BookingPageComponent;
  let fixture: ComponentFixture<BookingPageComponent>;

  const fakeActivatedRoute = {
    snapshot: { data: { } }
  } as ActivatedRoute;

  

  beforeEach(() => {

   
    TestBed.configureTestingModule({
      imports:[AppRoutingModule,
        AngularFireModule.initializeApp(environment.firebase),
        HttpClientModule],
      declarations: [BookingPageComponent, HeaderComponent],
      providers: [
        // Provide the mock ActivatedRoute
        {provide: ActivatedRoute ,useValue: fakeActivatedRoute},
        {provide: DatabaseService, useValue:""}
        
      ]
    });
    fixture = TestBed.createComponent(BookingPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
