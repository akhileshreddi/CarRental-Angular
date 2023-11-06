import { Component, ElementRef, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { Car } from 'src/app/models/car';
import { CarService } from 'src/app/services/cars.service';
import { DatabaseService } from 'src/app/shared/database.service';



@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class HomepageComponent  implements OnInit {

  Cars:Car[]
  
  @ViewChild('carList') carList: ElementRef;
  @ViewChild('carListCards') carListCards: ElementRef;

  currentIndex = 0;
  cardWidth: number;

  constructor(private carService: CarService, private router : Router, private dataService : DatabaseService){
    
  }

  ngOnInit(){
   this.dataService.getCarsData().subscribe((data) => {
      this.Cars = data.slice(0,6)
    });
    // this.Cars = this.carService.getCars();
  }


  redirectToLogin(){
        this.router.navigate(['/Login'])
  }



  ngAfterViewInit() {
    if(this.carListCards){
    this.cardWidth =
      this.carListCards.nativeElement.children[0].offsetWidth +
      parseInt(getComputedStyle(this.carListCards.nativeElement.children[0]).marginRight);
  }
}

  moveSlide(direction: 'left' | 'right') {
    console.log("Left | right")
    if (direction === 'left' && this.currentIndex > 0) {
      this.currentIndex--;
    } else if (direction === 'right' && this.currentIndex < this.carListCards.nativeElement.children.length - 1) {
      this.currentIndex++;
    }
    this.updateTransform();
  }

  updateTransform() {
    this.carList.nativeElement.style.transform = `translateX(-${this.currentIndex * this.cardWidth}px)`;
    
  }

  
}
