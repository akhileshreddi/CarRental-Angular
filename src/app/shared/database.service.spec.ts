import { TestBed } from '@angular/core/testing';

import { DatabaseService } from './database.service';
import { AppRoutingModule } from '../app-routing.module';
import { AngularFireModule } from '@angular/fire/compat';
import { HttpClientModule } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing'

describe('DatabaseService', () => {
  let service: DatabaseService;
  let httpController : HttpTestingController;

  beforeEach(() => {
    
    TestBed.configureTestingModule({
      imports:[AppRoutingModule,
        AngularFireModule.initializeApp(environment.firebase),
        HttpClientTestingModule,
        
    ]
    });
    service = TestBed.inject(DatabaseService);
    httpController = TestBed.inject(HttpTestingController)

  });

  it(' service should be created', () => {
    expect(service).toBeTruthy();
  });



  it("should get all CArs", () => {
    const mockdata:any = []
    service.getCarsData().subscribe((cars: any) => {
        expect(cars).toEqual(mockdata)
    });
    

   
  })

  
});
