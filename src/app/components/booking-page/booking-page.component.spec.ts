import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, convertToParamMap } from '@angular/router';
import { By } from '@angular/platform-browser';
import { BookingPageComponent } from './booking-page.component';
import { DatabaseService } from 'src/app/shared/database.service';
import { of } from 'rxjs';

describe('BookingPageComponent', () => {
  let component: BookingPageComponent;
  let fixture: ComponentFixture<BookingPageComponent>;
  let activatedRoute: ActivatedRoute;
  let databaseService: jasmine.SpyObj<DatabaseService>;

  beforeEach(() => {
    const databaseSpy = jasmine.createSpyObj('DatabaseService', ['getCarById']);
    TestBed.configureTestingModule({
      declarations: [BookingPageComponent],
      providers: [
        { provide: ActivatedRoute, useValue: { params: of({ id: 1 }), queryParams: of({ placeDetails: '{"location":"TestLocation","pickupdate":"2023-01-01","returndate":"2023-01-03"}' }) } },
        { provide: DatabaseService, useValue: databaseSpy }
      ]
    });

    fixture = TestBed.createComponent(BookingPageComponent);
    component = fixture.componentInstance;
    activatedRoute = TestBed.inject(ActivatedRoute);
    databaseService = TestBed.inject(DatabaseService) as jasmine.SpyObj<DatabaseService>;
  });
  
 
  it('should create', () => {
    expect(component).toBeTruthy();
  });

  
  // Add more test cases as needed
});
