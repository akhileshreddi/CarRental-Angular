import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookingPageComponent } from './booking-page.component';
import { MockActivatedRoute } from '../../mock-activatedRoute';
import { ActivatedRoute } from '@angular/router';

describe('BookingPageComponent', () => {
  let component: BookingPageComponent;
  let fixture: ComponentFixture<BookingPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BookingPageComponent],
      providers: [
        // Provide the mock ActivatedRoute
        { provide: ActivatedRoute, useClass: MockActivatedRoute }
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
