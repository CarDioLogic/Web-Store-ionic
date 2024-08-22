import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
} from '@ionic/angular/standalone';

@Component({
  standalone: true,
  selector: 'app-login',
  imports: [IonHeader, IonToolbar, IonTitle, IonContent],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  constructor(protected loginService: LoginService) {}

  ngOnInit() {
    console.log();
  }

  login(): void {
    this.loginService.login();
  }
}
