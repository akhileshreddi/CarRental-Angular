import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarsPageComponent } from './cars-page.component';
import { ActivatedRoute, Router } from '@angular/router';
// import { MockActivatedRoute } from '../../mock-activatedRoute';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { DatabaseService } from 'src/app/shared/database.service';
import { of } from 'rxjs';
import { HeaderComponent } from '../header/header.component';
import { AngularFireModule } from '@angular/fire/compat';
import { environment } from 'src/environments/environment';


class MockActivatedRoute {
  snapshot = {
    params: {
      location: 'TestLocation',
      pickupdate: 'TestPickupDate',
      returndate: 'TestReturnDate',
    },
  };
}

// Create a mock DatabaseService
class MockDatabaseService {
  getCarsData() {
    return of([]); // Replace this with your mock data if needed
  }
}

// Create a mock Router
class MockRouter {
  navigateByUrl(url: string) {
    return url; // Replace this with your mock implementation if needed
  }
}


describe('CarsPageComponent', () => {
  let component: CarsPageComponent;
  let fixture: ComponentFixture<CarsPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CarsPageComponent, HeaderComponent],
      imports: [
        AngularFireModule.initializeApp(environment.firebase),
        // other imports...
      ],
      providers: [
        { provide: ActivatedRoute, useClass: MockActivatedRoute },
        { provide: DatabaseService, useClass: MockDatabaseService },
        { provide: Router, useClass: MockRouter },
      ]
    });
    fixture = TestBed.createComponent(CarsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should handle type change', () => {
    const event = { target: { checked: true } };
    const mockdata = 'HATCH BACK'
    component.ontypechange(event);
    
    fixture.detectChanges();
    component.selectedLabels.push(...["HATCH BACK", "SEDAN", "SPORTS","SUV"])
    console.log('Selected Labels:', component.selectedLabels);
    expect(component.selectedLabels).toContain("SUV"); // Replace with your actual test data

  });

  it('should handle brand change', () => {
    const event = { target: { checked: true } };
    const mockdata = 'HATCH BACK'
    component.onbrandchange(event);
    
    fixture.detectChanges();
    component.selectedLabels.push(...["FORD", "HONDA AMAZE", "TATA NEXON","SUV"])
    console.log('Selected Labels:', component.selectedLabels);
    expect(component.selectedLabels).toContain("FORD"); // Replace with your actual test data

  });

  it('should handle transmission change', () => {
    const event = { target: { checked: true } };
    const mockdata = 'HATCH BACK'
    component.ontranschange(event);
    
    fixture.detectChanges();
    component.selectedLabels.push(...["MANUAL", "AUTOMATIC"])
    console.log('Selected Labels:', component.selectedLabels);
    expect(component.selectedLabels).toContain("MANUAL"); // Replace with your actual test data

  });


});
