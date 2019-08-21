import { Component, OnInit } from '@angular/core';
import {CountdownChildComponent} from '../countdown-child/countdown-child.component';
import { MissionService} from '../../mission.service'

@Component({
  selector: 'app-countdown-parent',
  templateUrl: './countdown-parent.component.html',
  styleUrls: ['./countdown-parent.component.css'],
  // providers:[MissionService]
})
export class CountdownParentComponent implements OnInit {

  constructor( private missionService: MissionService) { 
    missionService.missionConfirmed$.subscribe(astronaut => {
      this.history.push(`${astronaut} confirmed the mission`);
    });
  }
  ngOnInit() {
  }
  astronauts = ['Lovell', 'Swigert', 'Haise'];
  history: string[] = [];
  missions = ['Fly to the moon!',
              'Fly to mars!',
              'Fly to Vegas!'];
  nextMission = 0;
  announce(){
    let mission = this.missions[this.nextMission++];
    this.missionService.announceMission(mission);
    this.history.push(`Mission "${mission}" announced`);
    if (this.nextMission >= this.missions.length) { this.nextMission = 0; }
  }
}
