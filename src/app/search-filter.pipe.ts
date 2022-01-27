import { Pipe, PipeTransform } from '@angular/core';
import { Client } from '@core/models/client';

@Pipe({
  name: 'searchFilter'
})

export class SearchFilterPipe implements PipeTransform {

  transform(items: Client[], searchText: string): Client[]{
      if(!items || !searchText){
        return items;
      }
      return items.filter(dossier => dossier.nom.toLowerCase().includes(searchText.toLocaleLowerCase()));
  }
}


