import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SessionGuard implements CanActivate {
  constructor(private cookieService:CookieService, private route: Router){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {  
    return this.checkCookieSession();
  }
  
  checkCookieSession():boolean{
  try {
    /** retorna true si existe una cookie que se llama token */
    const token:boolean = this.cookieService.check('token');
    console.log('ok -> ',token);
    if (!token) {
      this.route.navigate(['/auth/login']);
      return false;
    }
    return token;
  } catch (error) {
    console.log(error);
    return false;
  }
    
  }

}
