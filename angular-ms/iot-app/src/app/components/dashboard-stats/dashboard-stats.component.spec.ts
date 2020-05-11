import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardStatsComponent } from './dashboard-stats.component';
import { TestModule } from '@modules/test.module';
import { ArduinoService } from '@services/arduino.service';
import { ArduinoServiceStub } from '@stubs/arduino.service.stub';

describe('DashboardStatsComponent', () => {
  let component: DashboardStatsComponent;
  let fixture: ComponentFixture<DashboardStatsComponent>;
  let arduinoService: ArduinoServiceStub;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
        declarations: [ DashboardStatsComponent ],
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
    fixture = TestBed.createComponent(DashboardStatsComponent);
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
