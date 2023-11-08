import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import { AngularFireModule } from '@angular/fire/compat';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { AuthService } from 'src/app/shared/auth.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

describe('SignupComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
        imports:[AppRoutingModule,
            AngularFireModule.initializeApp(environment.firebase),
            HttpClientModule,
            FormsModule,
            ReactiveFormsModule
        ],
      declarations: [LoginComponent],
    //   providers:[{provide:AuthService}]
    });
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
