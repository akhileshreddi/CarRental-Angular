import { TestBed } from '@angular/core/testing';

import { AuthService } from './auth.service';
import {AngularFireAuth} from '@angular/fire/compat/auth'
import { AppRoutingModule } from '../app-routing.module';
import { AngularFireModule } from '@angular/fire/compat';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { environment } from 'src/environments/environment';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(() => {
    
    TestBed.configureTestingModule({
      imports:[AppRoutingModule,
        AngularFireModule.initializeApp(environment.firebase),
        HttpClientModule,
        
    ]
    });
    service = TestBed.inject(AuthService);

  });

  it(' service should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should be register'), () => {
    expect(service.register("akhilesh", 8688367501,"abc@123.com","Akhil123")).toBeTruthy();
  }
});
