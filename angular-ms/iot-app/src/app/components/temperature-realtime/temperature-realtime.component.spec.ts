import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TemperatureRealtimeComponent } from './temperature-realtime.component';

describe('TemperatureRealtimeComponent', () => {
  let component: TemperatureRealtimeComponent;
  let fixture: ComponentFixture<TemperatureRealtimeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TemperatureRealtimeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TemperatureRealtimeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
