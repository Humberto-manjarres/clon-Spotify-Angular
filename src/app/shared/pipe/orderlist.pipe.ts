import { Pipe, PipeTransform } from '@angular/core';
import { TrackModel } from '@core/models/tracks.models';

@Pipe({
  name: 'orderlist'
})
export class OrderlistPipe implements PipeTransform {
  
  transform(value: TrackModel [],args: string | null= null,  sort: string ='asc'): TrackModel[] {
    
    /** TODO: arg puede ser un string o un null */

    try {
      if (args === null) {
          return value;
      }else{
         const tmpList = value.sort((a, b)=> {
          if (a.name > b.name) {
            return 1;
          }
          if (a.name < b.name) {
            return -1;
          }
          // a must be equal to b
          return 0;
        });
        return (sort === 'asc') ? tmpList:tmpList.reverse();
      }
    } catch (error) {
      console.log('Error --> ',error);
      return value;
    }
    //return value;
    
  }

}


