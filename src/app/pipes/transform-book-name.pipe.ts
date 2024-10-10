import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'transformBookName',
  standalone: true
})
export class TransformBookNamePipe implements PipeTransform {

  transform(value: string): string {
    if(!value){
      return value
    }
    let result = value.replace(/_/g, ' ');
    result = result.replace(/\.[^/.]+$/, '');
    return result;
  }
  
}
