import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LightStatsComponent } from './light-stats.component';

describe('LightStatsComponent', () => {
  let component: LightStatsComponent;
  let fixture: ComponentFixture<LightStatsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LightStatsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LightStatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
