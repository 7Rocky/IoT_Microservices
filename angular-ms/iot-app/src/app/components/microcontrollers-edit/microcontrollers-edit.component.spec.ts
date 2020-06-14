import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MicrocontrollersEditComponent } from './microcontrollers-edit.component';

describe('MicrocontrollersEditComponent', () => {
  let component: MicrocontrollersEditComponent;
  let fixture: ComponentFixture<MicrocontrollersEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MicrocontrollersEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MicrocontrollersEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
