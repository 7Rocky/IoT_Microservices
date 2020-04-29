import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TemperatureHistoryComponent } from './temperature-history.component';
import { TestModule } from '@modules/test.module';
import { ArduinoServiceStub } from '@stubs/arduino.service.stub';
import { ArduinoService } from '@services/arduino.service';

describe('TemperatureHistoryComponent', () => {
  let component: TemperatureHistoryComponent;
  let fixture: ComponentFixture<TemperatureHistoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
        declarations: [ TemperatureHistoryComponent ],
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
    fixture = TestBed.createComponent(TemperatureHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
