import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'ouiNon'
})
export class OuiNonPipe implements PipeTransform {

  transform(value: boolean): string {
    return value ? "Activé" : "Desactivé";
  }

}
