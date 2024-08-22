import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
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
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { RouterLink } from '@angular/router';
import { Coupon } from 'src/app/models/Coupons';
import { Product } from 'src/app/models/product';
import { MainMenuComponent } from 'src/app/components/main-menu/main-menucomponent';
import { OrdersService } from 'src/app/services/orders.service';
@Component({
  standalone: true,
  imports: [MainMenuComponent, CommonModule,
    IonLabel,
    IonThumbnail,
    IonItem,
    IonList,
    IonCardSubtitle,
    IonCardTitle,
    IonCardHeader,
    IonInfiniteScroll,
    IonInfiniteScrollContent,
    RouterLink,
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
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss'],
  providers: [OrdersService]
})
export class OrdersComponent  implements OnInit {
  orders: Array<any> = [];
  page: number = 1;
  maxPages: number = 0;
  itemPerPage: number = 10;

  constructor(private ordersService: OrdersService) {}

  ngOnInit() {
    this.handleRefresh();
  }
  ionViewWillEnter() {
    this.loadOrders();
  }

  loadOrders() {
    this.page = 1;
    this.ordersService
      .getOrdersPaginate(this.page, this.itemPerPage)
      .subscribe({
        next: (response: any) => {
          this.maxPages = response.pages;
          this.orders = response.data;
        },
        error: (err) => {
          console.error('Error loading coupons', err);
        },
      });
  }

  handleRefresh(event?: any) {
    this.loadOrders();
    if (event) {
      event.target.complete();
    }
  }

  onIonInfinite(event: any): void {
    if (this.page >= this.maxPages) {
      //End of the road notification?
      event.target.complete();
      return;
    }

    this.page++;
    this.ordersService
      .getOrdersPaginate(this.page, this.itemPerPage)
      .subscribe({
        next: (orders: any) => {
          console.log(orders);
          this.orders.push(...orders.data);

          event.target.complete();
        },
      });
  }
}
