import { Injectable } from '@angular/core';
import {AngularFireAuth} from '@angular/fire/compat/auth'
import { Router } from '@angular/router';
import { DatabaseService } from './database.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private fireauth : AngularFireAuth, private router: Router, private Dbservice : DatabaseService) { }
  
  //login Method
  login(email:string, password:string){
    this.fireauth.signInWithEmailAndPassword(email,password).then(() =>{
       localStorage.setItem('token','true')
       this.router.navigate(['start-page'])
    }, err=>{
         alert('something went wrong')
         this.router.navigate(['/Login'])
    })
  }


  //register Mehtod
  register(name:string, phone:number, email:string, password:string):void{
    if (!name || !phone || !email || !password) {
      alert('Please provide all required information.');
      
    }
    
    this.fireauth.createUserWithEmailAndPassword(email,password).then((userCredential)=>{
      const user_data = userCredential;
      // console.log(user_data.user.uid)
      this.Dbservice.addUserToDb(name,email,phone,user_data.user.uid)
      alert('Register succesfull')
      this.router.navigate(['/Login'])
    }, err => {
      alert(err.message)
      this.router.navigate(['/Login'])
    })
   
  }


  //logout   still pending at html side
  logout(){
    this.fireauth.signOut().then( () => {
      localStorage.removeItem('token')
      this.router.navigate(['/Login'])
    }, err => {
      alert(err.message);
    })
  }

   //forgot password  still pending at html side
  forgotpassword(email:string){
    this.fireauth.sendPasswordResetEmail(email).then( () => {
      this.router.navigate([''])
    }, err => {
       alert("some thing went wrong")
    })
  }

  

}
