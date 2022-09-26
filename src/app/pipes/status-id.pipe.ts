import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'statusID'
})
export class StatusIDPipe implements PipeTransform {

  transform(value: number, ...args: unknown[]): string {
    if(value !== undefined){
      
      if(value === 1){
        return 'En attende de joueurs'
      }
      if(value === 2){
        return 'En cours'
      }
      if(value === 3){
        return 'Terminé'
      }

  }
  return 'null'
  }

}
