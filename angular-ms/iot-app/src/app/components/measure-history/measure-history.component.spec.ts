import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MeasureHistoryComponent } from './measure-history.component';
import { TestModule } from '@modules/test.module';
import { ArduinoServiceStub } from '@stubs/arduino.service.stub';
import { ArduinoService } from '@services/arduino.service';

describe('MeasureHistoryComponent', () => {
  let component: MeasureHistoryComponent;
  let fixture: ComponentFixture<MeasureHistoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
        declarations: [ MeasureHistoryComponent ],
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
    fixture = TestBed.createComponent(MeasureHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
