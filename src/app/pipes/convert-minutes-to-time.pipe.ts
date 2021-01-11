import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'convertMinutesToTime'
})
export class ConvertMinutesToTimePipe implements PipeTransform {

  transform(minutes: number): string {
    const hours = Math.floor(minutes / 60);
    const totalMinutes = minutes % 60;
    return `${hours}h ${totalMinutes}m`;
  }

}
