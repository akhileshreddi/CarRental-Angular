import { TestBed, fakeAsync, tick } from '@angular/core/testing';

import { DatabaseService } from './database.service';
import { AppRoutingModule } from '../app-routing.module';
import { AngularFireModule } from '@angular/fire/compat';
import { HttpClientModule } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing'
import { AngularFireDatabase, SnapshotAction } from '@angular/fire/compat/database';
import { Observable, of } from 'rxjs';

describe('DatabaseService', () => {
  let service: DatabaseService;
  let httpController : HttpTestingController;
  let angularFireDatabaseMock: jasmine.SpyObj<AngularFireDatabase>;

  beforeEach(() => {
    angularFireDatabaseMock = jasmine.createSpyObj('AngularFireDatabase', ['object']);
    TestBed.configureTestingModule({
      imports:[AppRoutingModule,
        AngularFireModule.initializeApp(environment.firebase),
        HttpClientTestingModule,
        
    ],
    providers:[{ provide: AngularFireDatabase, useValue: angularFireDatabaseMock }]
    });
    service = TestBed.inject(DatabaseService);
    httpController = TestBed.inject(HttpTestingController)

  });

  it(' service should be created', () => {
    expect(service).toBeTruthy();
  });

  afterEach(() => {
    httpController.verify();
  });

  it('should add user to the database', fakeAsync(() => {
    const uid = 'erfj123445';
    const mockUserData = {
      name: 'Jhon',
      email: 'john@example.com',
      phone: 123456789,
      uid: uid,
    };
    service.addUserToDb(mockUserData.name, mockUserData.email, mockUserData.phone, uid);
    const req = httpController.expectOne(`https://car-rental-1bb11-default-rtdb.firebaseio.com/users/${uid}.json`);
    expect(req.request.method).toEqual('PUT');
    expect(req.request.body).toEqual(mockUserData);
    req.flush(mockUserData); // Mock a successful response
    tick();
    // httpController.verify();
  
  }));
  
 

  it("should get all CArs", () => {
    const mockData: any[] = [{ /* Your mock car data here */ }];

    service.getCarsData().subscribe((cars: any) => {
      expect(cars).toEqual(mockData);
    });

    const req = httpController.expectOne('https://car-rental-1bb11-default-rtdb.firebaseio.com/Cars-data.json');
    expect(req.request.method).toEqual('GET');
    req.flush(mockData);
    httpController.verify();
   
  })



  it("should get All users data", fakeAsync(() => {
   
    const uid = 'erfj123445';
    const mockUserData = {
      name: 'Jhon',
      email: 'john@example.com',
      phone: 123456789,
      uid: uid,
    };
    service.getUsersData(uid).subscribe((userData: any) => {
      expect(userData).toEqual(mockUserData);
    });
    const req = httpController.expectOne(`https://car-rental-1bb11-default-rtdb.firebaseio.com/users/${uid}.json`);
    expect(req.request.method).toEqual('GET');
    req.flush(mockUserData);
    httpController.verify();
    tick();
    
  }));


  it('should get car data by ID', fakeAsync(() => {
    const carId = 5;
    const mockCarData = { /* Your mock car data here */ };

    service.getCarById(carId).subscribe((carData: any) => {
      expect(carData).toEqual(mockCarData);
    });

    const req = httpController.expectOne(`https://car-rental-1bb11-default-rtdb.firebaseio.com/Cars-data/${carId-1}.json`);
    expect(req.request.method).toEqual('GET');
    req.flush(mockCarData);
    httpController.verify();
  }));

  
});
