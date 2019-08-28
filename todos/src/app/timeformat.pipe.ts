import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "timeformat"
})
export class TimeformatPipe implements PipeTransform {
  transform(value: any, args?: any): any {
    let isM0;
    let minute;
    let sec;
    minute = Math.floor(value / 60) 
    sec = Math.floor(value % 60) + ""
    isM0 = ":";
    if (minute == 0) {
      minute = "00";
    } else if (minute < 10) {
      minute = "0" + minute;
    }
    if (sec.length == 1) {
      sec = "0" + sec;
    }
    let time = minute + isM0 + sec
    if(time === 'NaN:NaN'){
      time = '00:00'
    }
    return time;
  }
}
