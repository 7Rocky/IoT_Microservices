import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarComponent } from './navbar.component';
import { LoginComponent } from '@components/login/login.component';
import { TestModule } from '@modules/test.module';

describe('NavbarComponent', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
        declarations: [
          LoginComponent,
          NavbarComponent
        ],
        imports: [ TestModule ]
      })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it("should present date as 'DD/MM/YYYY'", () => {
    expect(component.today).toMatch(/^([0-2][0-9]|3[0-1])\/(0[1-9]|1[0-2])\/2020$/);
  });
});
