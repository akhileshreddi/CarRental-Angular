import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Users } from '../models/user';
import { Observable } from 'rxjs';
import {HttpClient} from '@angular/common/http'

@Injectable({
    providedIn: 'root'
})
export class DatabaseService {

    constructor(private db : AngularFireDatabase, private http : HttpClient){}
   
    api_URL:string = "https://car-rental-1bb11-default-rtdb.firebaseio.com/"
    
    addUserToDb(name:string, email:string, phone:number,uid:any ){

        const userData = {
            name: name,
            email: email,
            phone: phone,
            uid : uid
          };
          // Push the user data to the Firebase Realtime Database under a new child with a unique key
          const url = `${this.api_URL}users/${uid}.json`;

            this.http.put(url, userData)
                .subscribe(
                  (result) => {
                      console.log("user added")
                      },
                      (error) => {
                        console.error('Error adding user to the database:', error);
                      }
                );
              
                
    }

    
    getCarsData(): any{
        // return this.db.list('Cars-data').valueChanges();
        const url = `${this.api_URL}Cars-data.json`
       return this.http.get(url)

    }
    
    getUsersData(uid : string){
       const url = `${this.api_URL}users/${uid}.json`
       return this.http.get(url)
    }


    getCarById(id:any){
      const url = `${this.api_URL}Cars-data/${id-1}.json`
      return this.http.get(url)
    }


    
}