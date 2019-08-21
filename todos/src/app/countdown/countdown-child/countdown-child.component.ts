import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { MissionService } from '../../mission.service';
import { Subscription }   from 'rxjs';

@Component({
  selector: 'app-countdown-child',
  templateUrl: './countdown-child.component.html',
  styleUrls: ['./countdown-child.component.css'],
  // providers: [MissionService]
})
export class CountdownChildComponent implements OnInit,OnDestroy {

  constructor(private missionService :  MissionService) { 
    this.subscription = missionService.missionAnnounced$.subscribe(
      mission => {
        this.mission = mission;
        this.announced = true;
        this.confirmed = false;
    });
  }

  ngOnInit(){

  }
  @Input() astronaut:string;
  mission = 'no mission'
  confirmed = false;
  announced = false;
  subscription : Subscription;
  confirm(){
    this.confirmed = true;
    this.missionService.confirmMission(this.astronaut);
  }
  ngOnDestroy() {
    // prevent memory leak when component destroyed
    this.subscription.unsubscribe();
  }
}
