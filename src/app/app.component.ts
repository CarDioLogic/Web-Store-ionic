import { Component, OnInit } from '@angular/core';
import { IonApp, IonRouterOutlet, IonContent, IonButton, IonIcon, IonBadge, IonModal, IonItem, IonFab, IonFabButton } from '@ionic/angular/standalone';
import {
IonMenu, IonHeader, IonToolbar, IonButtons, IonMenuButton, IonTitle
} from '@ionic/angular/standalone';
import { MainMenuComponent } from './components/main-menu/main-menucomponent';
import { ShoppingCartService } from './services/shopping-cart.service';
import { ItemShoppingCart } from './models/item-shopping-cart';
import { ShoppingCartComponent } from './components/shopping-cart/shopping-cart.component';
import { AnimationController } from '@ionic/angular';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: true,
  imports: [IonFabButton, IonFab, IonItem, IonModal,ShoppingCartComponent , IonBadge, IonIcon, IonButton, IonContent, IonApp, IonRouterOutlet, IonMenu,
    IonHeader, IonToolbar, IonButtons, IonMenuButton, IonTitle, MainMenuComponent
  ],
})
export class AppComponent implements OnInit{
  cartItemCount: number = 0;


  constructor(private cartService: ShoppingCartService,
    private animationCtrl:AnimationController
  ) {}

  ngOnInit() {
    this.cartService.getItems().subscribe({
      next: (items: Array<ItemShoppingCart>) => {
        this.cartItemCount = items.length;
      },
    });
  }

  enterAnimation = (baseEl: HTMLElement) => {
    const root = baseEl.shadowRoot;
    if (!root) return;

    const backdropAnimation = this.animationCtrl
      .create()
      .addElement(root.querySelector('ion-backdrop')!)
      .fromTo('opacity', '0.01', 'var(--backdrop-opacity');

    const wrapperAnimation = this.animationCtrl
      .create()
      .addElement(root.querySelector('.modal-wrapper')!)
      .keyframes([
        {
          offset: 0,
          opacity: '0',
          trasform: 'translateX(100%)',
          boxShadow: '0 0 0 rgba(0, 0, 0, 0)',
        },
        {
          offset: 1,
          opacity: '0.99',
          trasform: 'translateX(0)',
          boxShadow: '-8px 0 16px rgba(0, 0, 0, .5)',
        },
      ]);

    return this.animationCtrl
      .create()
      .addElement(baseEl)
      .easing('ease-out')
      .duration(500)
      .addAnimation([backdropAnimation, wrapperAnimation]);
  };

  leaveAnimation = (baseEl: HTMLElement) => {
    return this.enterAnimation(baseEl)?.direction('reverse');
  };
  
}
