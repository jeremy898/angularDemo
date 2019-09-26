import { Component, OnInit } from '@angular/core';
import { UtilsService } from "../utils.service";
// const moment = require('moment/moment');
@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.css']
})
export class StoreComponent implements OnInit {

  constructor( 
    private util: UtilsService
    ) { }
  dayline : number = 3600
  currentime = new Date().getHours()
  // isOver:boolean = true
  roundList = [
    {time:14400000,moment:43200},
    {time:18000000,moment:46800},
    {time:21600000,moment:50400},
    {time:25200000,moment:54000}
  ]
  ngOnInit() {
    this.init()
    console.log(this.currentime)
  }
  init(){
    // let time = new Date().getTime()
    let timeout = setInterval(() => {
        this.dayline--
        if(this.dayline == 10){
        window.clearInterval(timeout)
      }
    }, 1000);
  }
  isOver(item){
    return item.moment/3600/this.currentime >= 1
  }
}
