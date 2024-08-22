import { Component } from '@angular/core';
import {
  IonMenuButton,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonIcon,
  IonMenu,
  IonList,
  IonButtons,
  IonApp,
} from '@ionic/angular/standalone';
import { Router } from '@angular/router';
import { MainMenuComponent } from "../../components/main-menu/main-menucomponent";
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [
    IonApp,
    IonButtons,
    IonMenuButton,
    IonList,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonIcon,
    IonMenu,
    MainMenuComponent
],
})
export class HomePage {
  constructor(private router: Router) {}

  navigateToProductManagement() {
    this.router.navigate(['gestao-produtos']);
  }
}
