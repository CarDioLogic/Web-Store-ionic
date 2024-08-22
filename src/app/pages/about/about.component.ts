import { Component, OnInit } from '@angular/core';
import {
  IonHeader,
  IonToolbar,
  IonMenu,
  IonMenuButton,
  IonThumbnail,
  IonContent,
  IonButtons,
  IonInfiniteScrollContent,
  IonTitle,
  IonCard,
  IonImg,
  IonCardContent,
  IonButton,
  IonIcon,
  IonRefresher,
  IonRefresherContent,
  IonBadge,
  IonFab,
  IonFabButton,
  IonInfiniteScroll,
  IonCardHeader,
  IonCardTitle,
  IonCardSubtitle,
  IonList,
  IonItem,
  IonLabel,
} from '@ionic/angular/standalone';
import { HttpClientModule } from '@angular/common/http';
import { AppService } from 'src/app/services/app.service';
import { MainMenuComponent } from 'src/app/components/main-menu/main-menucomponent';

@Component({
  standalone: true,
  imports: [MainMenuComponent,
    IonLabel,
    IonThumbnail,
    IonItem,
    IonList,
    IonCardSubtitle,
    IonCardTitle,
    IonCardHeader,
    IonInfiniteScroll,
    IonInfiniteScrollContent,
    IonFabButton,
    IonFab,
    IonBadge,
    HttpClientModule,
    IonRefresher,
    IonIcon,
    IonRefresherContent,
    IonCardContent,
    IonImg,
    IonCard,
    IonButtons,
    IonButton,
    IonHeader,
    IonToolbar,
    IonMenu,
    IonMenuButton,
    IonContent,
    IonTitle,
],
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
  providers:[AppService]
})
export class AboutComponent  implements OnInit {

  aboutUs: any;

  constructor(private appService: AppService) {}

  ngOnInit(): void {
    this.appService.getAboutUs().subscribe((data: any) => {

      this.aboutUs = data;
      console.log(this.aboutUs)
    });
  }
}
