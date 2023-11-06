import { Component, ElementRef, OnInit, ViewChild,ViewEncapsulation } from '@angular/core';
import {FormControl, NgForm, Validators} from '@angular/forms';
import { FormGroup,FormArray } from '@angular/forms';
import { AuthService } from 'src/app/shared/auth.service';
import 'firebase/database';
import { AngularFireDatabase } from '@angular/fire/compat/database';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  encapsulation: ViewEncapsulation.None
  
})
export class LoginComponent implements OnInit {


  private container: HTMLElement;
  signUpForm:FormGroup
  loginForm:FormGroup
  check_password:string='';

  
  constructor(private authservice : AuthService,private elementRef: ElementRef, private db : AngularFireDatabase) {}

  ngOnInit(): void {
    // Access the container element by its id
    this.container = this.elementRef.nativeElement.querySelector('#container');
    // Check if the container and pointer elements exist
    setTimeout(() => {
      if (this.container) {
        this.container.classList.add('sign-in');
      }
    }, 200);


   //Reactive Forms

   this.signUpForm = new FormGroup({
    'name': new FormControl(null,[Validators.required]),
    'email':new FormControl(null,[Validators.required, Validators.email]),
    'phonenumber':new FormControl(null,[Validators.required, this.phoneNumberValidation]),
    'password': new FormControl(null,[Validators.required,
                                      Validators.minLength(6), 
                                      Validators.maxLength(15),
                                    this.checkPasswordValidation]),
    'confirmpassword': new FormControl(null,[Validators.required,
                                             this.ConfirmpasswordValidation])
   })

   

   this.loginForm = new FormGroup({
    'LoginUsername': new FormControl(null,[Validators.required]),
    'LoginPassword': new FormControl(null,[Validators.required])

   })


  }

  
 //toggle method for signin & signUp
  toggle(): void {
    if (this.container) {
      this.container.classList.toggle('sign-in');
      this.container.classList.toggle('sign-up');
    }
  }


  
  onSubmitRegister() {
    console.log(this.signUpForm)
    let name = this.signUpForm.value.name
    let email = this.signUpForm.value.email
    let password = this.signUpForm.value.password
    let phone = this.signUpForm.value.phonenumber
    this.authservice.register(name,phone,email, password)
    
    this.signUpForm.reset()

    
     
}

onSubmitLogin(){
   console.log(this.loginForm)
   this.authservice.login(this.loginForm.value.LoginUsername, this.loginForm.value.LoginPassword)
   this.loginForm.reset()
   
}

//add forgotpassword componenent and route it (INCOMPLETE)
onforgotPassword(){
   
}



// checkUsernameValidation(control:FormControl):{ [s: string]: boolean}{
//   const pattern = /^[a-z][a-z0-9]*$/;
//   const value = control.value;
//   if(value===null){
//     return null
//   }
//   if(!value.match(pattern)){
//     return {invalidUsername:true}
//   }
//   return null

// }





checkPasswordValidation = (control:FormControl):{[s:string]:boolean} =>{
  const value = control.value
  this.check_password = value
  // console.log(this.check_password)
  // console.log(this.age)
  if(value === null){
    return null
  }
  const passwordPattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).*$/;
  if (!passwordPattern.test(value)) {
    return { invalidPassword: true };
  }
  return null
}

ConfirmpasswordValidation=(control : FormControl):{[s:string]:boolean}=>{
  const confimpass = control.value
  if(this.check_password != confimpass){
    return {'PassWordNotMatched':true}
  }
  return null 

}


phoneNumberValidation=(control : FormControl):{[s:string]:boolean}=>{
  const phone_number = control.value
  if( phone_number && phone_number.length != 10){
    return {'invalidPhone':true}
  }
  return null 

}









}



