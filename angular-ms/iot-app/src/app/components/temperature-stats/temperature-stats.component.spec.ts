import { async, ComponentFixture, TestBed } from '@angular/core/testing'

import { TemperatureStatsComponent } from './temperature-stats.component'
import { TestModule } from '@modules/test.module'
import { ArduinoService } from '@services/arduino.service'
import { ArduinoServiceStub } from '@stubs/arduino.service.stub'

describe('TemperatureStatsComponent', () => {
  let component: TemperatureStatsComponent
  let fixture: ComponentFixture<TemperatureStatsComponent>
  let arduinoService: ArduinoServiceStub

  beforeEach(async(() => {
    TestBed.configureTestingModule({
        declarations: [ TemperatureStatsComponent ],
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
    fixture = TestBed.createComponent(TemperatureStatsComponent)
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
