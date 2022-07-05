import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { AuthService } from './auth.service';

import * as mockRaw from '../../../data/user.json';
import { of } from 'rxjs';

describe('AuthService', () => {
  let service: AuthService;
  let mockUser: any = (mockRaw as any).default;
  /** va ser de tipo objeto -> por las llaves,
   * dentroo del objeto tendrá una propiedad llamada post,
   * dicha propiedad será de tipo jasmine.spy
   */
  let httpClientSpy: {post: jasmine.Spy};

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[
        HttpClientTestingModule        
      ]
    });
    /** httpClientSpy se hará pasar x HttpClient y espiará su método post */
    httpClientSpy = jasmine.createSpyObj('HttpClient',['post']);
    service = new AuthService(httpClientSpy as any);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });


  //TODO: Pruba del sendCredentials
  it('Debe retornar un objeto con "data" y "tockenSession" ', (done: DoneFn) => {
    //TODO: Arrang
    const user: any = mockUser.userOk;
    let mockResponse: any = {
      data:{},
      tokenSession:'0x0x0x0x'
    };
    httpClientSpy.post.and.returnValue(
      //retornamos un observable, ya que el método sendCredentials real retorna tambien un observable
      of(mockResponse)
    )

    //TODO: Act
    service.sendCredentials(user.email, user.password).subscribe(respuestApi => {
      console.log('--> ',respuestApi);
      const getProperties = Object.keys(respuestApi);
      // TODO: Assert
      expect(getProperties).toContain('data');
      expect(getProperties).toContain('tokenSession');

      done();//despues de todo el proceso, cerrar la peticion
    })
    
  });

  it('Test de suma 2 + 3', () =>{
    const a = 2;
    const b = 3;
    const respuesta = service.suma(a,b)
    expect(respuesta).toEqual(5);
  })


});
