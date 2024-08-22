import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ItemShoppingCart } from 'src/app/models/item-shopping-cart';
import { ShoppingCartService } from 'src/app/services/shopping-cart.service';
import { CouponsService } from 'src/app/services/coupons.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import {
  IonHeader,
  IonTitle,
  IonContent,
  IonToolbar,
  IonCard,
  IonCardContent,
  IonImg,
  IonList,
  IonButton,
  IonIcon,
  IonItem,
  IonInput,
  IonLabel, IonItemDivider, IonItemGroup } from '@ionic/angular/standalone';
import { Coupon } from 'src/app/models/Coupons';
import {
  FormGroup,
  FormBuilder,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { OrdersService } from 'src/app/services/orders.service';
import { Order, OrderProduct } from 'src/app/models/order';

@Component({
  standalone: true,
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss'],
  providers: [ShoppingCartService, CouponsService, OrdersService],
  imports: [IonItemGroup, IonItemDivider, 
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    IonHeader,
    IonTitle,
    IonContent,
    IonToolbar,
    IonCard,
    IonCardContent,
    IonImg,
    IonList,
    IonButton,
    IonIcon,
    IonItem,
    IonLabel,
    IonInput,
  ],
})
export class ShoppingCartComponent implements OnInit {
  isDonePurchasing:boolean = false;
  cart: Array<ItemShoppingCart> = new Array<ItemShoppingCart>();
  order:Order={
    products: [],
    cupao:'',
    valorFinal:0,
    dadosContato: {
      nome:'',
      email:'',
      morada:'',
      telefone:''
    }
  }

  orderProduct: OrderProduct = {
    productId: 0,
    quantidade: 0,
  }

  coupon: Coupon = {
    id: '',
    code: '',
    discountPercentage: 0,
    expirationDate: new Date(),
  };
  discountForm: FormGroup;
  contactsForm: FormGroup;

  totalCartValue: number = 0;

  constructor(
    private cartService: ShoppingCartService,
    private couponService: CouponsService,
    private orderService: OrdersService,
    private fb: FormBuilder
  ) {
    this.discountForm = this.fb.group({
      discountCode: ['', [Validators.required, Validators.minLength(1)]],
    });

    this.contactsForm = this.fb.group({
      nome: ['', [Validators.required, Validators.minLength(5)]],
      email: ['', [Validators.required, Validators.email]],
      morada: ['', [Validators.required, Validators.minLength(5)]],
      telefone: ['', [Validators.required, Validators.minLength(5)]],
    });
  }

  ngOnInit() {
    this.cartService.getItems().subscribe({
      next: (items: Array<ItemShoppingCart>) => {
        this.cart = items;
        console.log(this.cart)
      },
    });
  }

  inputQuantityPlusClick(cartItem: ItemShoppingCart): void {
    this.cartService.addItem({ product: cartItem.product, quantity: 1 });
    console.log('clicou', cartItem);
  }

  inputQuantityMinusClick(cartItem: ItemShoppingCart): void {
    console.log('clicou');
    console.log('clicou', cartItem);
    this.cartService.removeItem({ product: cartItem.product, quantity: 1 });
  }

  inputQuantityValueBlur(event: Event, cartItem: ItemShoppingCart): void {
    const value = Number((event.target as HTMLInputElement).value);

    if (value) {
      if (value !== cartItem.quantity) {
        cartItem.quantity = value;
        this.cartService.setItem(cartItem);
      }
    } else {
      cartItem.quantity = 0;
      this.cartService.setItem(cartItem);
    }
  }

  removeAllItems() {
    this.cartService.clearAllItems();
  }

  validateDiscountCode() {
    const discountCode = this.discountForm.get('discountCode')?.value;

    return new Promise((resolve, reject) => {
      this.couponService.getCouponsByCode(discountCode).subscribe({
        next: (data) => {
          //the api request looks for coupons with the discountCode and retrieves an array!
          if (data.length > 0) {
            this.coupon = data[0]; //get the first record!

            if (new Date() > new Date(this.coupon.expirationDate)) {
              alert('Cupão expirado');
              this.resetCupon();
            } else {
              /* this.ApplyDiscountToCartTotal();  */
            }
          } else {
            alert('Cupão inválido');
            reject(new Error('Cupão inválido!'));
          }
        },
        error: (error) => {
          alert('Cupão inválido!');
          console.error('Error obtaining coupon', error);
          reject(error);
        },
      });
    });
  }

  calculateTotalPricePerItem(itemPrice: number, quantity: number) {
    let pricePerItem = itemPrice * quantity;
    return Math.round(pricePerItem * 100) / 100;
  }
  calculateTotalInCart() {
    let total = 0;
    this.cart.forEach((item) => {
      total += item.product.price * item.quantity;
    });

    this.totalCartValue =  Math.round(total * 100) / 100;
    return this.totalCartValue;
  }
  ApplyDiscountToCartTotal() {
    let total = this.calculateTotalInCart();

    if (this.coupon.id) {
      let discount = this.coupon.discountPercentage / 100;
      total = total * (1 - discount);
      this.totalCartValue = Math.round(total * 100) / 100;
      return this.totalCartValue;
    }

    return '';
  }
  toggleConcludePurchasing(){
    this.isDonePurchasing = !this.isDonePurchasing;
  }
  performPayment() {
    //should redirect to payment page or implement logic to perform payment
    this.createOrder();
    this.removeAllItems();

    if (this.coupon.id) {
      alert(`Pagamento efetuado com cupão com código ${this.coupon.code}!`);
      this.deleteCoupon();
      return;
    }
    alert('Pagamento efetuado!');
  }

  deleteCoupon() {
    this.couponService.deleteCoupon(this.coupon.id).subscribe({
      next: (product: any) => {
        console.log('Coupon used!', this.coupon);
      },
    });
  }


  resetCupon() {
    this.coupon = {
      id: '',
      code: '',
      discountPercentage: 0,
      expirationDate: new Date(),
    };
  }

  createOrder(){
    this.order = {
      products: this.convertProductsToOrderProducts(),
      cupao: this.coupon.code,
      valorFinal: this.totalCartValue,
      dadosContato: this.contactsForm.value
/*       {
        nome: this.discountForm.get('nome')?.value,
        email: this.discountForm.get('email')?.value,
        morada: this.discountForm.get('morada')?.value,
        telefone: this.discountForm.get('telefone')?.value,
      } */
    }
    console.log(this.order)

    this.orderService.createOrder(this.order).subscribe({
      next: (order: any) => {
        console.log('Created order: ', order);
      },
    });
  }

  convertProductsToOrderProducts(){
    let orderProducts: Array<OrderProduct> = [];

    this.cart.forEach((item) => {
      this.orderProduct.productId = item.product.id;
      this.orderProduct.quantidade = item.quantity;

      orderProducts.push(this.orderProduct)
    });

    return orderProducts;
  }
}
