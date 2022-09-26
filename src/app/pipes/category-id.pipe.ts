import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'categoryID'
})
export class CategoryIDPipe implements PipeTransform {


  transform(value: number, ...args: unknown[]): string {

    if(value !== undefined){
      
        if(value === 1){
          return 'Junior'
        }
        if(value === 2){
          return 'Senior'
        }
        if(value === 3){
          return 'Veteran'
        }

    }
    return 'null'    
  }


  // transform(value: number[], ...args: unknown[]): string[] {

  //   let PipeValue : string [] = []

  //   if(value !== undefined){
  //     console.log('ici');
      
  //     value.forEach(element => {
  //       if(element === 1){
  //         PipeValue.push('Junior')
  //       }
  //       if(element === 2){
  //         PipeValue.push('Senior')
  //       }
  //       if(element === 3){
  //         PipeValue.push('Veteran')
  //       }
  //     });

  //     return PipeValue
      
  //   }else{
  //     return []
  //   }

    
  // }

}
