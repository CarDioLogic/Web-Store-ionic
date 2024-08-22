import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./pages/store/store.component').then((m) => m.StoreComponent),
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },


  {
    path: 'loja',
    loadComponent: () =>
      import('./pages/store/store.component').then((m) => m.StoreComponent)
  },

  //produtos
  {
    path: 'gestao-produtos',
    loadComponent: () =>
      import('./pages/products/manage-products/manage-products.component').then((m) => m.ManageProductsComponent)
    
  },
  {
    path: 'criar-produto',
    loadComponent: () =>
      import('./pages/products/upsert-product/upsert-product.component').then((m) => m.UpsertProductComponent)
  },
  {
    path: 'editar-produto/:id',
    loadComponent: () =>
      import('./pages/products/upsert-product/upsert-product.component').then((m) => m.UpsertProductComponent)
  },

  //cupoes
  {
    path: 'manage-coupons',
    loadComponent: () =>
      import('./pages/coupons/manage-coupons/manage-coupons.component').then((m) => m.ManageCouponsComponent)
  },
  {
    path: 'edit-coupon/:id',
    loadComponent: () =>
      import('./pages/coupons/upsert-coupon/upsert-coupon.component').then((m) => m.UpsertCouponComponent)
  },
  {
    path: 'create-coupon',
    loadComponent: () =>
      import('./pages/coupons/upsert-coupon/upsert-coupon.component').then((m) => m.UpsertCouponComponent)
  },

  //orders
  {
    path: 'orders',
    loadComponent: () =>
      import('./pages/orders/orders.component').then((m) => m.OrdersComponent)
  },
  //about
  {
    path: 'about',
    loadComponent: () =>
      import('./pages/about/about.component').then((m) => m.AboutComponent)
  }
];
