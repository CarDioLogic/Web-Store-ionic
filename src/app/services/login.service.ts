import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor() { }

  //numa app real o login devera ser feito de forma segura.
  login(){
    localStorage.setItem('login', 'true');
  }

  logout(){
    localStorage.removeItem('login');
  }

  isLoggedIn(){
    if(localStorage.getItem('login') === 'true'){
      return true;
    }

    return false;
  }
}
