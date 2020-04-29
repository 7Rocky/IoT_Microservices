import { NgModule } from '@angular/core';

import { AppModule } from '@modules/app.module';
import { ArduinoServiceStub } from '../stubs/arduino.service.stub';
import { AuthServiceStub } from '../stubs/auth.service.stub';

@NgModule({
  declarations: [ ],
  imports: [
    AppModule
  ],
  providers: [
    ArduinoServiceStub,
    AuthServiceStub
  ]
})
export class TestModule { }

