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
import { ProductsService } from 'src/app/services/products.service';
import { ManageCouponsComponent } from '../../coupons/manage-coupons/manage-coupons.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { RouterLink } from '@angular/router';
import { Product } from 'src/app/models/product';
import { MainMenuComponent } from "../../../components/main-menu/main-menucomponent";

@Component({
  standalone: true,
  imports: [
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
    ManageCouponsComponent,
    IonTitle,
    MainMenuComponent
],
  selector: 'app-manage-products',
  templateUrl: './manage-products.component.html',
  styleUrls: ['./manage-products.component.scss'],
  providers: [ProductsService],
})
export class ManageProductsComponent implements OnInit {
  products: Array<Product> = [];
  page: number = 1;
  maxPages: number = 0;
  itemPerPage: number = 10;

  constructor(private productsService: ProductsService) {}

  ngOnInit() {
    this.handleRefresh();
  }
  ionViewWillEnter() {
    this.loadProducts();
  }

  loadProducts() {
    this.page = 1;
    this.productsService
      .getProductsPaginate(this.page, this.itemPerPage)
      .subscribe({
        next: (response: any) => {
          this.maxPages = response.pages;
          this.products = response.data;
        },
        error: (err) => {
          console.error('Error loading products', err);
        },
      });
  }

  handleRefresh(event?: any) {
    this.loadProducts();
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
    this.productsService
      .getProductsPaginate(this.page, this.itemPerPage)
      .subscribe({
        next: (products: any) => {
          console.log(products);
          this.products.push(...products.data);

          event.target.complete();
        },
      });
  }

  deleteProduct(productId: number) {
    //change the confirm to a modal???
    if (confirm('Apagar este produto?')) {
      this.products = this.products.filter(
        (product) => product.id !== productId
      );

      this.productsService.deleteProduct(productId).subscribe({
        next: (product: any) => {
          console.log(product);
        },
      });
    }
  }
}
