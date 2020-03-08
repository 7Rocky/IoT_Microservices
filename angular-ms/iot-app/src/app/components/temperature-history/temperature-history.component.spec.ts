import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TemperatureHistoryComponent } from './temperature-history.component';

describe('TemperatureHistoryComponent', () => {
  let component: TemperatureHistoryComponent;
  let fixture: ComponentFixture<TemperatureHistoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TemperatureHistoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TemperatureHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
