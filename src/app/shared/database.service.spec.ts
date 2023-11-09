import { TestBed } from '@angular/core/testing';

import { DatabaseService } from './database.service';
import { AppRoutingModule } from '../app-routing.module';
import { AngularFireModule } from '@angular/fire/compat';
import { HttpClientModule } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import {HttpClientTestingModule} from '@angular/common/http/testing'

describe('DatabaseService', () => {
  let service: DatabaseService;

  beforeEach(() => {
    
    TestBed.configureTestingModule({
      imports:[AppRoutingModule,
        AngularFireModule.initializeApp(environment.firebase),
        HttpClientTestingModule,
        
    ]
    });
    service = TestBed.inject(DatabaseService);

  });

  it(' service should be created', () => {
    expect(service).toBeTruthy();
  });

  
});
