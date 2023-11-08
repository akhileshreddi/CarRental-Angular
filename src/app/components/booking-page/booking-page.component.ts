import { Component, ElementRef, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { DatabaseService } from 'src/app/shared/database.service';

@Component({
  selector: 'app-booking-page',
  templateUrl: './booking-page.component.html',
  styleUrls: ['./booking-page.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class BookingPageComponent implements OnInit{

  carId: number;
  place_details: any;
  car_details:any;
  returndate:string;
  pickupdate:string;
  location:string;

  pickup_format:string;
  return_format:string;
  no_of_days:number;
  car_name:string;

  rental_amount:number;
  tot_amount:number;
  gst_amount:number;
  refundable_deposit:number = 3000;

  luggage_cost:boolean = false;
  protect_cost:boolean = false;


  @ViewChild('targetele') targetele : ElementRef;
  @ViewChild('targetEle') targetEle : ElementRef;
  @ViewChild('checkbox1') luggage_checkbox : ElementRef;
  
  @ViewChild('targetele2') targetele2: ElementRef;
  @ViewChild('targetEle2') targetEle2 : ElementRef;
  @ViewChild('checkbox2') trip_checkbox : ElementRef;

  constructor(private route: ActivatedRoute, private dbservice : DatabaseService) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.carId = +params['id']; 
    });

    // Capture and parse the carDetails from the query parameters
    this.route.queryParams.subscribe((queryParams:any) => {
      if (queryParams.placeDetails) {
        this.place_details = JSON.parse(queryParams.placeDetails);
            this.location = this.place_details.location
            this.returndate =this.place_details.returndate
            this.pickupdate = this.place_details.pickupdate
      }
    });

      this.dbservice.getCarById(this.carId).subscribe(data => {
      this.car_details = data
     
   
      this.pickup_format = this.formatDate(this.pickupdate)
      this.return_format = this.formatDate(this.returndate)
      
      this.no_of_days = this.daysBetweenDates(this.pickupdate, this.returndate)
      this.rental_amount =  this.no_of_days*this.car_details.price*24;
      this.gst_amount = (12/100)*this.rental_amount
      this.tot_amount = this.rental_amount +this.gst_amount +this.refundable_deposit
      this.car_name = this.car_details.make+" "+this.car_details.model

    })

    
  
   
       
  }

   formatDate(inputDate:string):string{
    const months = [
      'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
      'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
    ];
  
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  
    const parts = inputDate.split('-');
    if (parts.length !== 3) {
      return 'Invalid Date';
    }
  
    const year = +parts[0];
    const month = parseInt(parts[1], 10) - 1; // Subtract 1 as months are zero-based
    const day = parseInt(parts[2], 10);
  
    const date = new Date(year, month, day);
    if (isNaN(date.getTime())) {
      return 'Invalid Date';
    }
    const dayOfWeek = days[date.getDay()];
    const dayOfMonth = date.getDate();
    const monthName = months[date.getMonth()];
    const fullYear = date.getFullYear();
  
    return `${dayOfWeek}, ${dayOfMonth} ${monthName} ${fullYear}`;
  }

  daysBetweenDates(startDate:any, endDate:any):number {
    const date1:any = new Date(startDate);
    const date2:any = new Date(endDate);
  
    // Calculate the time difference in milliseconds
    const timeDiff = date2 - date1;
  
    // Convert the time difference to days
    const daysDiff = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
  
    return daysDiff;
  }


  onLuggageCheckboxChange(){
    const checkbox: HTMLInputElement = this.luggage_checkbox.nativeElement;
    const element: HTMLElement = this.targetele.nativeElement;
    const element2: HTMLElement = this.targetEle.nativeElement;
    
    
    if (checkbox.checked) {
      element.classList.remove('luggage_cost');
      element2.classList.remove('luggage_cost');
      this.luggage_cost = true
    } else {
      element.classList.add('luggage_cost');
      element2.classList.add('luggage_cost');
      this.luggage_cost = false
    }
    this.updateTotalAmount()
  }

  onTripCheckboxChange(){

    const tripcheckbox: HTMLInputElement = this.trip_checkbox.nativeElement;
    const tripelement: HTMLElement = this.targetele2.nativeElement;
    const tripelement2: HTMLElement = this.targetEle2.nativeElement;
    
    
    if (tripcheckbox.checked) {
      tripelement.classList.remove('protect_cost');
      tripelement2.classList.remove('protect_cost');
      this.protect_cost = true
    } else {
      tripelement.classList.add('protect_cost');
      tripelement2.classList.add('protect_cost');
      this.protect_cost = false
    }
    this.updateTotalAmount()

  }


  updateTotalAmount(){
    if(this.luggage_cost && this.protect_cost){
      this.tot_amount = this.rental_amount +this.gst_amount + this.refundable_deposit+ 999 + 999;
    }else if(this.luggage_cost || this.protect_cost){
      this.tot_amount = this.rental_amount +this.gst_amount + this.refundable_deposit+ 999;
    }else{
      this.tot_amount = this.rental_amount +this.gst_amount+ this.refundable_deposit;
    }

  }
  



  
}
