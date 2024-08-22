import { Component, inject, OnInit } from '@angular/core';
import { IonHeader,
   IonToolbar,
  IonTitle,
IonContent,
IonList,
IonItem,
IonIcon,
IonLabel, IonMenuToggle, IonButton } from '@ionic/angular/standalone'
import { LoginService } from 'src/app/services/login.service';
import { Route, Router, RouterLink } from '@angular/router';

@Component({
  standalone:true,
  selector: 'app-main-menu',
  imports: [
    IonHeader, IonToolbar, IonTitle,
    IonContent, IonList, IonItem, IonIcon, IonLabel, IonMenuToggle, IonButton, RouterLink
  ],
  templateUrl: './main-menu.component.html',
  styleUrls: ['./main-menu.component.scss'],
})
export class MainMenuComponent  implements OnInit {
  constructor(protected loginService: LoginService,
    private router: Router,
  ) { }

  ngOnInit() {
    console.log();
  }

  logout(): void{
    this.loginService.logout();
  }

  navigateToLoja(){
    this.router.navigate(['loja'])
  }
}
