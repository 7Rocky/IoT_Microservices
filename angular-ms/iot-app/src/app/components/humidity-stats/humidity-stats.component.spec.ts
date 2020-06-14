import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HumidityStatsComponent } from './humidity-stats.component';

describe('HumidityStatsComponent', () => {
  let component: HumidityStatsComponent;
  let fixture: ComponentFixture<HumidityStatsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HumidityStatsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HumidityStatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
