import { Directive, ElementRef, HostBinding, HostListener } from '@angular/core';

@Directive({
  selector: '[appHoverEffect]'
})
export class HoverEffectDirective {

  constructor() { }

  
  @HostBinding('style.transform') transform:string;
  @HostBinding('style.transform') translate:string;
  @HostBinding('style.background-color') bc:string;
  @HostBinding('style.color')color:string


  @HostListener('mouseenter') onMouseEnter(){
    this.transform = 'scale(0.9)'
    this.translate = 'translateX(12px)'
   
  }

  @HostListener('mouseleave') onMouseLeave(){
    this.transform = 'scale(1)'
  }
}
