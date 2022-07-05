import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { RouterTestingModule } from '@angular/router/testing';
import { AuthPageComponent } from './auth-page.component';
import { By } from '@angular/platform-browser';

describe('AuthPageComponent', () => {
  //TODO: component tiene acceso a toodo lo que está en el componente
  let component: AuthPageComponent;
  let fixture: ComponentFixture<AuthPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports:[
        HttpClientTestingModule, RouterTestingModule        
      ],
      declarations: [ AuthPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  //TODO: debe asegurar que el formulario sea invalido, cuando ingrese datos erroneos
  //TODO: utilizamos el patron de prueba AAA.
  it('deberia retornar invalido el formulario', () => {
    
    //TODO: Arranque -> declaramos las variables a utilizar en la prueba
    const mockCredenciales = {
      email: 'test@test******',
      password: '11111111111111111111111111111111'
    }

    const emailForm:any = component.formLogin.get('email');
    const passwordForm:any = component.formLogin.get('password');
     
    // TODO: Actuar -> al campo o cuadro de texto email y password agregar el email y password errado.
    emailForm.setValue(mockCredenciales.email);
    passwordForm.setValue(mockCredenciales.password);

    //TODO: Assert -> esperar un comportamiento, es verdadero que el fomulario es invalido
    expect(component.formLogin.invalid).toBeTrue();
  });

  
  it('deberia retornar valido el formulario', () => {
    
    //TODO: Arrange
    const mockCredenciales = {
      email: 'test@test.com',
      password: '12345678'
    }

    const emailForm:any = component.formLogin.get('email');
    const passwordForm:any = component.formLogin.get('password');
     
    // TODO: Act
    emailForm.setValue(mockCredenciales.email);
    passwordForm.setValue(mockCredenciales.password);

    //TODO: Assert 
    expect(component.formLogin.valid).toBeTrue();
  });

  //TODO:
  it('El botón debe tener la palabra "Iniciar sesión"',()=>{ 
    //TODO: buscamos y capturamos el elemento HTML, el (.) es xq es un elemento de clase y no un id
     const elementRef = fixture.debugElement.query(By.css('.form-action button'))
     const getInnerText = elementRef.nativeElement.innerText;

     expect(getInnerText).toEqual('Iniciar sesión');


  })

});
