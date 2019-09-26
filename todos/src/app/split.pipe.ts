import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'timeline'
})
export class SplitPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    let time;
        if(value > -1){
            var hour = Math.floor(value/3600)
            var min = Math.floor(value/60) % 60
            var sec = value % 60;
            if(hour < 10) {
              time = '0'+ hour + ":"; // 01:
            } else {
              time = hour + ":";
            }
            if(min < 10){
              time += "0" //01:00:
            }
            time += min + ":";
            if(sec < 10){
              time += "0" //01:00:0
            }
            time += sec
        }
        return time;
  }
}
