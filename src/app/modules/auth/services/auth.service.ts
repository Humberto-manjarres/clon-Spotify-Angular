import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Observable, tap } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly URL = environment.api;
  constructor(private http: HttpClient) { }

  sendCredentials(email:string, password:string):Observable<any>{
    console.log('service -> ',email, password);
    
    /**TODO: cuando la variable (clave) es igual al valor, se coloca uno de los dos  -> clave - valor*/
    const body = {
      email,
      password
    }
    return this.http.post(`${this.URL}/auth/login`,body);
  }

  suma(a: number, b: number): number{
    return a + b;
  }

}
