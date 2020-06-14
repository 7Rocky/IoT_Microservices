import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MicrocontrollersComponent } from './microcontrollers.component';

describe('MicrocontrollersComponent', () => {
  let component: MicrocontrollersComponent;
  let fixture: ComponentFixture<MicrocontrollersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MicrocontrollersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MicrocontrollersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
