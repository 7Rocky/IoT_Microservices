import { TestBed } from '@angular/core/testing';

import { ArduinoService } from './arduino.service';
import { HttpClient, HttpHandler } from '@angular/common/http';

describe('ArduinoService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [ HttpClient, HttpHandler ]
  }));

  it('should be created', () => {
    const service: ArduinoService = TestBed.get(ArduinoService);
    expect(service.getValue()).toBe('real value');
  });
});
