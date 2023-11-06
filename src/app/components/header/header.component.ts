import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Users } from 'src/app/models/user';
import { AuthService } from 'src/app/shared/auth.service';
import { DatabaseService } from 'src/app/shared/database.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit{


  constructor(private auth : AngularFireAuth, private databaseService : DatabaseService, private as: AuthService){

  }
  logged_user : any
  ngOnInit(): void {
    this.auth.authState.subscribe((user) => {
      if(user){
        this.databaseService.getUsersData(user.uid).subscribe((user_data) => {
          this.logged_user = user_data
        })
      }
    })
   
  }

  Logout(){
    this.as.logout()
  }

}
