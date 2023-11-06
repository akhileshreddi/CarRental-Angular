import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SliderHeadingComponent } from './slider-heading.component';

describe('SliderHeadingComponent', () => {
  let component: SliderHeadingComponent;
  let fixture: ComponentFixture<SliderHeadingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SliderHeadingComponent]
    });
    fixture = TestBed.createComponent(SliderHeadingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
