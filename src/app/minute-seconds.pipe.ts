import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'minuteSeconds',
})
export class MinuteSecondsPipe implements PipeTransform {
  transform(value: number): string {
    const minutes = Math.floor(value / 60);
    const remainingSeconds = value % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  }
}
