import { Component, ElementRef } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ImgBrokenDirective } from './img-broken.directive';

@Component({
  template:'<img class="testing-directive" appImgBroken [src]="srckMock">'
})

class TestComponent {
  public srckMock:any = null;
  
}

//TODO: hace referencia al nombre de la prueba
describe('ImgBrokenDirective', () => {

  let component: TestComponent;
  let fixture: ComponentFixture<TestComponent>;

  beforeEach(()=> {
    TestBed.configureTestingModule({
      declarations:[TestComponent,ImgBrokenDirective]
    })
    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  })

  //TODO: hace referencia a cada bloque de codigo a probar
  it('should create an instance', (done:DoneFn) => {
    const mockElement = new ElementRef('');
    const directive = new ImgBrokenDirective(mockElement);
    expect(directive).toBeTruthy();
    done();
  });

  it('TestComponent debe instanciarse correctamente',()=> {
    expect(component).toBeTruthy();
  })

  it('Diectiva debe cambiar imagen si exite problemas',(done: DoneFn)=>{
    //TODO: Arrange
    const beforeImgElement = fixture.debugElement.query(By.css('.testing-directive')).nativeElement;//accedemos a todas las propiedades del DOM
    const beforeImgSrc = beforeImgElement.src; // tenemos solo el src de todos los elementos de DOM
    component.srckMock = undefined;
    
    setTimeout(() => {
      const afterImgElement = fixture.debugElement.query(By.css('.testing-directive')).nativeElement;//accedemos a todas las propiedades del DOM
      const afterImgSrc = afterImgElement.src; // tenemos solo el src de todos los elementos de DOM
      
      expect(afterImgSrc).toEqual('https://upload.wikimedia.org/wikipedia/commons/thumb/c/cf/Angular_full_color_logo.svg/1200px-Angular_full_color_logo.svg.png')
      done();
    }, 3000);

  })

});
