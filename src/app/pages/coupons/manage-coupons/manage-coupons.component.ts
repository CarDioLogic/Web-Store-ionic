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
import { CouponsService } from 'src/app/services/coupons.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { RouterLink } from '@angular/router';
import { Coupon } from 'src/app/models/Coupons';
import { MainMenuComponent } from 'src/app/components/main-menu/main-menucomponent';
import { ManageProductsComponent } from '../../products/manage-products/manage-products.component';

@Component({
  standalone: true,
  selector: 'app-manage-coupons',
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
    ManageProductsComponent,
    IonTitle,
  ],
  templateUrl: './manage-coupons.component.html',
  styleUrls: ['./manage-coupons.component.scss'],
  providers: [CouponsService],
})
export class ManageCouponsComponent implements OnInit {
  coupons: Array<Coupon> = [];
  page: number = 1;
  maxPages: number = 0;
  itemPerPage: number = 10;

  constructor(private couponService: CouponsService) {}

  ngOnInit() {
    this.handleRefresh();
  }
  ionViewWillEnter() {
    this.loadCoupons();
  }

  loadCoupons() {
    this.page = 1;
    this.couponService
      .getCouponsPaginate(this.page, this.itemPerPage)
      .subscribe({
        next: (response: any) => {
          this.maxPages = response.pages;
          this.coupons = response.data;
        },
        error: (err) => {
          console.error('Error loading coupons', err);
        },
      });
  }

  handleRefresh(event?: any) {
    this.loadCoupons();
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
    this.couponService
      .getCouponsPaginate(this.page, this.itemPerPage)
      .subscribe({
        next: (coupons: any) => {
          console.log(coupons);
          this.coupons.push(...coupons.data);

          event.target.complete();
        },
      });
  }

  deleteCoupon(couponId: string) {
    //mudar este confirm para um modal???
    if (confirm('Apagar este cupão?')) {
      this.coupons = this.coupons.filter((coupon) => coupon.id !== couponId);

      this.couponService.deleteCoupon(couponId).subscribe({
        next: (coupon: any) => {
          console.log(coupon);
        },
      });
    }
  }
}
