import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductsService } from 'src/app/services/products.service';
import { ShoppingCartService } from 'src/app/services/shopping-cart.service';
import { ItemShoppingCart } from 'src/app/models/item-shopping-cart';
import { ShoppingCartComponent } from 'src/app/components/shopping-cart/shopping-cart.component';
import { AnimationController } from '@ionic/angular';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonImg,
  IonLabel,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonInfiniteScroll,
  IonInfiniteScrollContent,
  IonRefresher,
  IonRefresherContent,
  IonFab,
  IonFabButton,
  IonIcon,
  IonGrid,
  IonRow,
  IonCol,
  IonMenu,
  IonButtons,
  IonMenuButton,
  IonBadge,
  IonButton,
  IonModal,
  IonCardSubtitle,
} from '@ionic/angular/standalone';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Product } from 'src/app/models/product';
import { ManageCouponsComponent } from '../coupons/manage-coupons/manage-coupons.component';
import { MainMenuComponent } from "../../components/main-menu/main-menucomponent";

@Component({
  standalone: true,
  selector: 'app-store',
  imports: [
    IonCardSubtitle,
    ManageCouponsComponent,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonImg,
    IonLabel,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardContent,
    IonInfiniteScroll,
    IonInfiniteScrollContent,
    IonRefresher,
    IonRefresherContent,
    IonFab,
    IonFabButton,
    IonIcon,
    IonGrid,
    IonRow,
    IonCol,
    IonMenu,
    IonButtons,
    IonMenuButton,
    IonBadge,
    IonButton,
    IonModal,
    CommonModule,
    FormsModule,
    CurrencyPipe,
    ShoppingCartComponent,
    HttpClientModule,
    MainMenuComponent
],
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.scss'],
  providers: [ProductsService, ShoppingCartComponent, AnimationController],
})
export class StoreComponent implements OnInit {
  @ViewChild(IonContent) content?: IonContent;
  products: Array<any> = [];
  page: number = 1;
  maxPages: number = 0;
  itemPerPage: number = 3;
  cartItemCount: number = 0;

  constructor(
    private productsService: ProductsService,
    private cartService: ShoppingCartService,
    private animationCtrl: AnimationController
  ) {}

  ngOnInit() {
    this.cartService.getItems().subscribe({
      next: (items: Array<ItemShoppingCart>) => {
        this.cartItemCount = items.length;
      },
    });
    this.handleRefresh();
  }

  handleRefresh(event?: any) {
    this.page = 1;
    this.productsService.getProductsPaginate(1, this.itemPerPage).subscribe({
      next: (products: any) => {
        this.maxPages = products.pages;
        this.products = products.data;

        if (event) event.target.complete();
      },
    });
  }

  onIonInfinite(event: any): void {
    if (this.page >= this.maxPages) {
      event.target.complete();
      return;
    }
    this.productsService
      .getProductsPaginate(++this.page, this.itemPerPage)
      .subscribe({
        next: (products: any) => {
          this.products.push(...products.data);
          event.target.complete();
        },
      });
  }

  scrollToTop() {
    this.content?.scrollToTop(1000);
  }

  addShoppingCart(product: Product) {
    this.cartService.addItem({ product: product, quantity: 1 });
  }
}
