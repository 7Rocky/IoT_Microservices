import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardMicrocontrollerComponent } from './dashboard-microcontroller.component';
import { TestModule } from '@modules/test.module';
import { ArduinoService } from '@services/arduino.service';
import { ArduinoServiceStub } from '@stubs/arduino.service.stub';

describe('DashboardMicrocontrollerComponent', () => {
  let component: DashboardMicrocontrollerComponent;
  let fixture: ComponentFixture<DashboardMicrocontrollerComponent>;
  let arduinoService: ArduinoServiceStub;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
        declarations: [ DashboardMicrocontrollerComponent ],
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
    fixture = TestBed.createComponent(DashboardMicrocontrollerComponent);
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
