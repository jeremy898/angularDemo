import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CountdownChildComponent } from './countdown-child.component';

describe('CountdownChildComponent', () => {
  let component: CountdownChildComponent;
  let fixture: ComponentFixture<CountdownChildComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CountdownChildComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CountdownChildComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
