import { Component, OnInit,ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Car } from 'src/app/models/car';
import { DatabaseService } from 'src/app/shared/database.service';

@Component({
  selector: 'app-cars-page',
  templateUrl: './cars-page.component.html',
  styleUrls: ['./cars-page.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class CarsPageComponent implements OnInit {

  location:string;
  pickupDate:string;
  availabelCars:Car[];
  
  car_details: {location:string, pickupdate:string, returndate:string}
  Cars:Car[];
  private CarsDataSubscription : Subscription;



   today = new Date();
   returnDate = new Date();
   

  constructor(private route : ActivatedRoute, private dbService : DatabaseService, private router : Router){}
  ngOnInit(): void {
    
    const initialParams = this.route.snapshot.paramMap;

   if (initialParams) {
    this.location = initialParams.get('location');
    this.pickupDate = initialParams.get('pickupdate');
  }

  this.CarsDataSubscription = this.dbService.getCarsData().subscribe( {
    next: (data) => {
      if (data) {
        this.Cars = data;
        this.availabelCars = this.findAvailableCars();
      }
    },
    error: (err) => {
      console.error('Error fetching data:', err);
    },
    complete: () => {
      console.log('Subscription completed.');
    }
  });
  
}


selectedLabels:string[] = []
ontypechange(event:any){
  
  const checkbox = event.target;
  const labelElement = checkbox.nextElementSibling;

  if (labelElement) {
    const label = labelElement.textContent;
    if (checkbox.checked) {
      this.selectedLabels.push(label);
    } else {
      const index = this.selectedLabels.indexOf(label);
      if (index !== -1) {
        this.selectedLabels.splice(index, 1);
      }
    }
    console.log("labels",this.selectedLabels)
    this.availabelCars = this.filterCarsonType(this.selectedLabels);
  }
}


onbrandchange(event:any){
    
  const checkbox = event.target;
  const labelElement = checkbox.nextElementSibling;

  if (labelElement) {
    const label = labelElement.textContent;
    if (checkbox.checked) {
      this.selectedLabels.push(label);
    } else {
      const index = this.selectedLabels.indexOf(label);
      if (index !== -1) {
        this.selectedLabels.splice(index, 1);
      }
    }
    console.log("labels",this.selectedLabels)
    this.availabelCars = this.filterCarsonBrand(this.selectedLabels);
  }
  
}

ontranschange(event:any){
    
  const checkbox = event.target;
  const labelElement = checkbox.nextElementSibling;

  if (labelElement) {
    const label = labelElement.textContent;
    if (checkbox.checked) {
      this.selectedLabels.push(label);
    } else {
      const index = this.selectedLabels.indexOf(label);
      if (index !== -1) {
        this.selectedLabels.splice(index, 1);
      }
    }
    
    this.availabelCars = this.filterCarsonTrans(this.selectedLabels);
  }

}


onfuelchange(event:any){
    
  const checkbox = event.target;
  const labelElement = checkbox.nextElementSibling;

  if (labelElement) {
    const label = labelElement.textContent;
    if (checkbox.checked) {
      this.selectedLabels.push(label);
    } else {
      const index = this.selectedLabels.indexOf(label);
      if (index !== -1) {
        this.selectedLabels.splice(index, 1);
      }
    }
    
    this.availabelCars = this.filterCarsonFuel(this.selectedLabels);
  }
 
}

onseatchange(event:any){
    
  const checkbox = event.target;
  const labelElement = checkbox.nextElementSibling;

  if (labelElement) {
    const label = labelElement.textContent;
    if (checkbox.checked) {
      this.selectedLabels.push(label);
    } else {
      const index = this.selectedLabels.indexOf(label);
      if (index !== -1) {
        this.selectedLabels.splice(index, 1);
      }
    }
   
    this.availabelCars = this.filterCarsonSeat(this.selectedLabels);
  }
 
}


  findAvailableCars(){
    const date = new Date(this.pickupDate)
    const availabelCars = this.Cars.filter((car) => {
      const availdate = new Date(car.avaliable_date);
      return  this.location === car.place ;
    })
    return availabelCars
  }


  filterCarsonType(selectedLabels: string[]): Car[] {
    if (selectedLabels.length === 0) {
      return this.findAvailableCars(); // If no labels are selected, return all available cars
    } else {
      return this.findAvailableCars().filter((car) => selectedLabels.includes(car.type) );
    }

}

filterCarsonBrand(selectedLabels: string[]): Car[] {
  if (selectedLabels.length === 0) {
    return this.findAvailableCars(); // If no labels are selected, return all available cars
  } else {
    // const availabelCars = this.findAvailableCars().filter((car) => {
    //   console.log(":"+car.make + ' '+ car.model)
    // })
    return this.findAvailableCars().filter((car) => selectedLabels.includes(car.make + " " +car.model));
  }

}

filterCarsonTrans(selectedLabels: string[]): Car[] {
  if (selectedLabels.length === 0) {
    return this.findAvailableCars(); // If no labels are selected, return all available cars
  } else {
    return this.findAvailableCars().filter((car) => selectedLabels.includes(car.transmission_type) );
  }

}

filterCarsonFuel(selectedLabels: string[]): Car[] {
  if (selectedLabels.length === 0) {
    return this.findAvailableCars(); // If no labels are selected, return all available cars
  } else {
    return this.findAvailableCars().filter((car) => selectedLabels.includes(car.fuel_type) );
  }

}

filterCarsonSeat(selectedLabels: string[]): Car[] {
  if (selectedLabels.length === 0) {
    return this.findAvailableCars(); // If no labels are selected, return all available cars
  } else {
    return this.findAvailableCars().filter((car) => selectedLabels.includes(car.seat_capacity.toString()));
  }

}

sortByReviews(event: any){
   const selectedvalue = event.target.value;
   if(selectedvalue === 'LTH'){
    this.availabelCars.sort((a,b) => a.reviews - b.reviews)
   }else if(selectedvalue === 'HTL'){
    this.availabelCars.sort((a,b) => b.reviews - a.reviews)
   }
}

sortByPrice(event: any){
  const selectedvalue = event.target.value;
  if(selectedvalue === 'LTH'){
   this.availabelCars.sort((a,b) => a.price- b.price)
  }else if(selectedvalue === 'HTL'){
   this.availabelCars.sort((a,b) => b.price - a.price)
  }
}

booknow(id:number){

  // this.route.navigate(['/cars-list')
  
  this.car_details = {
    location : this.route.snapshot.params['location'],
    pickupdate: this.route.snapshot.params['pickupdate'],
    returndate: this.route.snapshot.params['returndate']
  }

  // console.log(this.car_details)

  this.router.navigate(['/booking-page', id], {
    queryParams: {
      placeDetails: JSON.stringify(this.car_details)
    }
  });
}

ngOnDestroy(){
  if(this.CarsDataSubscription){
    this.CarsDataSubscription.unsubscribe()
  }
}



}
