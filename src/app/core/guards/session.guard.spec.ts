import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { SessionGuard } from './session.guard';

describe('Testing of SessionGuard', () => {
  let guard: SessionGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[
        RouterTestingModule
      ]
    });
    guard = TestBed.inject(SessionGuard);
  });

  //TODO: primera pregunta de la prueba
  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

});
