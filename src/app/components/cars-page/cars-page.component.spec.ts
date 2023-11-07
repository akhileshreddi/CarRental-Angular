import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarsPageComponent } from './cars-page.component';
import { ActivatedRoute } from '@angular/router';
import { MockActivatedRoute } from '../../mock-activatedRoute';
import { AngularFireDatabase } from '@angular/fire/compat/database';
describe('CarsPageComponent', () => {
  let component: CarsPageComponent;
  let fixture: ComponentFixture<CarsPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CarsPageComponent],
      providers: [
        // Provide the mock ActivatedRoute
        { provide: [ActivatedRoute,AngularFireDatabase] }
      ]
    });
    fixture = TestBed.createComponent(CarsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
