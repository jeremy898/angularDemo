import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CountdownParentComponent } from './countdown-parent/countdown-parent.component';
import { CountdownChildComponent } from './countdown-child/countdown-child.component';
import { MissionService } from '../mission.service'

@NgModule({
  declarations: [CountdownParentComponent, CountdownChildComponent],
  imports: [
    CommonModule,
  ],
  exports:[CountdownParentComponent],
  providers:[MissionService]
})
export class CountdownModule { }
