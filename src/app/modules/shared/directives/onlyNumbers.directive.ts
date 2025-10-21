import { Directive, HostListener } from '@angular/core';

@Directive({
  selector: '[appOnlyNumbers][validators]',
})
export class OnlyNumbersDirective {

 @HostListener('keypress', ['$event'])
  validateOnlyNumber(event: KeyboardEvent){
    const key = event.key
    console.log(event)
  }
}
