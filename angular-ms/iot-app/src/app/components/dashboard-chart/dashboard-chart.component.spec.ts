import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardChartComponent } from './dashboard-chart.component';
import { TestModule } from '@modules/test.module';
import { ArduinoService } from '@services/arduino.service';
import { ArduinoServiceStub } from '@stubs/arduino.service.stub';

describe('DashboardChartComponent', () => {
  let component: DashboardChartComponent;
  let fixture: ComponentFixture<DashboardChartComponent>;
  let arduinoService: ArduinoServiceStub;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
        declarations: [ DashboardChartComponent ],
        imports: [ TestModule ],
        providers: [
          { 
            provide: ArduinoService,
            useClass: ArduinoServiceStub
          }
        ]
      })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should use ArduinoService', () => {
    arduinoService = TestBed.inject(ArduinoServiceStub);
    expect(arduinoService.getValue()).toBe('real value');
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
