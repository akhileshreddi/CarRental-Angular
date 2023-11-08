import { Directive, ElementRef, HostBinding, HostListener } from '@angular/core';

@Directive({
  selector: '[appHoverEffect]'
})
export class HoverEffectDirective {

  constructor() { }

  
  @HostBinding('style.transform') transform:string;
  @HostBinding('style.background-color') bc:string;
  @HostBinding('style.color')color:string


  @HostListener('mouseenter') onMouseEnter(){
    this.transform = 'scale(1.2)'
    
   
  }

  @HostListener('mouseleave') onMouseLeave(){
    this.transform = 'scale(1)'
  }
}
