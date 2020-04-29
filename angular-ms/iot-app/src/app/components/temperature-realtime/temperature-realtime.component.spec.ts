import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TemperatureRealtimeComponent } from './temperature-realtime.component';
import { TestModule } from '@modules/test.module';
import { ArduinoServiceStub } from '@stubs/arduino.service.stub';
import { ArduinoService } from '@services/arduino.service';

describe('TemperatureRealtimeComponent', () => {
  let component: TemperatureRealtimeComponent;
  let fixture: ComponentFixture<TemperatureRealtimeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
        declarations: [ TemperatureRealtimeComponent ],
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
    fixture = TestBed.createComponent(TemperatureRealtimeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
