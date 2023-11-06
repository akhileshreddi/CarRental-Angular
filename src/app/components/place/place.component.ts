import { Component ,OnInit,ViewEncapsulation} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-place',
  templateUrl: './place.component.html',
  styleUrls: ['./place.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class PlaceComponent implements OnInit {
    
    city:string
    PlaceForm:FormGroup
    places:string[] = ["Bangalore", "Hyderabad","Chennai","Mumbai","Delhi","Patna","Kochi","Mumbai","Kolkata"]

    constructor(private router: Router){}

    currentDate(): string {
      const today = new Date();
      const year = today.getFullYear();
      const month = String(today.getMonth() + 1).padStart(2, '0');
      const day = String(today.getDate()).padStart(2, '0');
      return `${year}-${month}-${day}`;
  }


  textOptions: string[] = [
    "App Available on <br> Play store and App Store",
    "Car Starting Price Start on 20$/hr",
    "Best Offers Available",
    
  ];

  currentText: string = this.textOptions[0];
  currentIndex: number = 0;

  ngOnInit(): void {
    this.updateText();
    setInterval(() => this.updateText(), 5000);

    const today = new Date();
    const returnDate = new Date();
    returnDate.setDate(today.getDate() + 2);
    console.log("typeof", typeof today)
    this.PlaceForm = new FormGroup({
      'location': new FormControl('Bangalore',[Validators.required]),
      'pickupdate': new FormControl(this.formatDate(today),[Validators.required]),
      'returndate': new FormControl(this.formatDate(returnDate),[Validators.required]),
  
     })
  }

  updateText() {
    this.currentIndex = (this.currentIndex + 1) % this.textOptions.length;
    this.currentText = this.textOptions[this.currentIndex];
  }

  
  onSelectingPlace():void{
  //  console.log(typeof this.PlaceForm.value.pickupdate)
    this.router.navigate(['/cars-list',{location : this.PlaceForm.get('location').value, pickupdate:this.PlaceForm.value.pickupdate , returndate:this.PlaceForm.value.returndate}])
  }

  formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }
}

