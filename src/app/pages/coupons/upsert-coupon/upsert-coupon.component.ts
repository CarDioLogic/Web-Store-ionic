import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import {
  FormControl,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import {
  IonHeader,
  IonTextarea,
  IonToolbar,
  IonTitle,
  IonContent,
  IonList,
  IonItem,
  IonIcon,
  IonLabel,
  IonNote,
  IonImg,
  IonMenu,
  IonButtons,
  IonButton,
  IonMenuButton,
  IonInput,
  IonToggle,
  IonBackButton,
} from '@ionic/angular/standalone';
import { Route, Router, ActivatedRoute } from '@angular/router';
import { CouponsService } from 'src/app/services/coupons.service';
import { MainMenuComponent } from 'src/app/components/main-menu/main-menucomponent';

@Component({
  standalone: true,
  selector: 'app-upsert-coupons',
  imports: [
    IonTextarea,
    IonBackButton,
    HttpClientModule,
    IonToggle,
    IonInput,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonList,
    IonItem,
    IonIcon,
    IonLabel,
    IonNote,
    IonImg,
    ReactiveFormsModule,
    IonMenu,
    IonButtons,
    IonButton,
    MainMenuComponent,
    IonMenuButton,
  ],
  templateUrl: './upsert-coupon.component.html',
  styleUrls: ['./upsert-coupon.component.scss'],
  providers: [CouponsService],
})
export class UpsertCouponComponent implements OnInit {
  criarForm: FormGroup = new FormGroup({
    code: new FormControl('', [Validators.required, Validators.minLength(4)]),
    discountPercentage: new FormControl('', [
      Validators.required,
      Validators.min(0.01),
    ]),
    expirationDate: new FormControl('', Validators.required),
  });
  couponId: string = '';
  pageTitle: string = 'Criar cupão';
  buttonText: string = 'Criar';
  isEditForm: boolean = false;

  constructor(
    private couponsService: CouponsService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.couponId = params['id'];
      if (this.couponId) {
        this.isEditForm = true;
        this.loadCoupon(this.couponId);
        this.pageTitle = 'Editar cupão';
        this.buttonText = 'Editar';
      }
    });
  }

  handleFormSubmit(): void {
    if (this.criarForm.valid) {
      if (this.isEditForm === false) {
        this.createCoupon();
      } else if (this.isEditForm === true) {
        this.editCoupon();
      }
    }
  }

  createCoupon() {
    this.couponsService.createCoupon(this.criarForm.value).subscribe({
      next: (coupon: any) => {
        console.log('Created coupon: ', coupon);
        this.router.navigate(['manage-coupons']);
      },
    });
  }
  editCoupon() {
    this.couponsService
      .editCoupon(this.criarForm.value, this.couponId)
      .subscribe({
        next: (coupon: any) => {
          console.log('Edited coupon: ', coupon);
          this.router.navigate(['gmanage-coupons']);
        },
      });
  }

  loadCoupon(couponId: string) {
    this.couponsService.getCouponsById(couponId).subscribe({
      next: (coupon: any) => {
        console.log(coupon);
        this.criarForm.controls['code'].setValue(coupon.code);
        this.criarForm.controls['discountPercentage'].setValue(
          coupon.discountPercentage
        );
        this.criarForm.controls['expirationDate'].setValue(
          coupon.expirationDate
        );
      },
    });
  }
}
