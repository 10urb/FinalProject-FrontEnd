import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'vatAdded',
})
export class VatAddedPipe implements PipeTransform {
  //value: ilk değer yani o an ki unitPrice , rate ilk parametre yani gönderdiğimiz rakam, number dönüş tipi
  transform(value: number, rate: number): number {
    return value + (value * rate) / 100;
  }
}
