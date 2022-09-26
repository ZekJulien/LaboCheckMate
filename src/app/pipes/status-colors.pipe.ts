import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'statusColors'
})
export class StatusColorsPipe implements PipeTransform {

  transform(value: number, ...args: unknown[]): string {
    if(value !== undefined){

      if(value === 1){
        return 'green-700'
      }
      if(value === 2){
        return 'orange-500'
      }
      if(value === 3){
        return 'red-700'
      }

  }
  return 'null' 
}

}

