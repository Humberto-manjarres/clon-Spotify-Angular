import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '@modules/auth/services/auth.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-auth-page',
  templateUrl: './auth-page.component.html',
  styleUrls: ['./auth-page.component.css']
})
export class AuthPageComponent implements OnInit {
  errorSession: boolean = false;
  formLogin: FormGroup = new FormGroup({});

  constructor(private authServices: AuthService,private cookie:CookieService, private router:Router) { }

  ngOnInit(): void {
    this.formLogin = new FormGroup(
      {
        email: new FormControl('',[
          Validators.required,
          Validators.email
        ]),
        password: new FormControl('',[
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(12)
        ])
      }
    )
  }

  sendLogin():void{
    const body = this.formLogin.value;
    const {email, password} = this.formLogin.value;
    console.log('componente -> ',body);
    this.authServices.sendCredentials(email,password).subscribe({
      next: (responseOk)=> {
        console.log('session correcta -> ',responseOk);
        const {data,tokenSession} = responseOk;
        /** TODO: creamos una cookie y en ella guardamos el token */
        this.cookie.set('token', tokenSession,4,'/'); 
        this.router.navigate(['/tracks']);
      },
      error: (err)=>{
        this.errorSession = true;
        console.log('session incorrecta',err);
      }
    })

  }

}
