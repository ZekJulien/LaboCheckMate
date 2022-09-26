import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'categoryColors'
})
export class CategoryColorsPipe implements PipeTransform {

  transform(value: number, ...args: unknown[]): string {
    if(value !== undefined){

        if(value === 1){
          return 'primary-900'
        }
        if(value === 2){
          return 'blue-800'
        }
        if(value === 3){
          return 'indigo-900'
        }

    }
    return 'null' 
  }

}
