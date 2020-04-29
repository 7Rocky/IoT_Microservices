import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import { TestModule } from '@modules/test.module';
import { AuthService } from '@services/auth.service';
import { AuthServiceStub } from 'src/app/stubs/auth.service.stub';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
        declarations: [ LoginComponent ],
        imports: [ TestModule ],
        providers: [
          {
            provide: AuthService,
            useClass: AuthServiceStub
          }
        ]
      })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
