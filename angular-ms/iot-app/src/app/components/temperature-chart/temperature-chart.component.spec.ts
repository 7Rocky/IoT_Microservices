import { async, ComponentFixture, TestBed } from '@angular/core/testing'

import { TemperatureChartComponent } from './temperature-chart.component'
import { TestModule } from '@modules/test.module'
import { ArduinoService } from '@services/arduino.service'
import { ArduinoServiceStub } from '@stubs/arduino.service.stub'

describe('TemperatureChartComponent', () => {
  let component: TemperatureChartComponent
  let fixture: ComponentFixture<TemperatureChartComponent>
  let arduinoService: ArduinoServiceStub

  beforeEach(async(() => {
    TestBed.configureTestingModule({
        declarations: [ TemperatureChartComponent ],
        imports: [ TestModule ],
        providers: [
          { 
            provide: ArduinoService,
            useClass: ArduinoServiceStub
          }
        ]
      })
      .compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(TemperatureChartComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should use ArduinoService', () => {
    arduinoService = TestBed.inject(ArduinoServiceStub)
    expect(arduinoService.getValue()).toBe('real value')
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
