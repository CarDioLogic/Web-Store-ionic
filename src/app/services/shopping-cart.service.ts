import { Injectable } from '@angular/core';
import { ItemShoppingCart } from '../models/item-shopping-cart';
import { BehaviorSubject, find } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {
  private items: Array<ItemShoppingCart> = new Array<ItemShoppingCart>();
  private items$: BehaviorSubject<Array<ItemShoppingCart>> = new BehaviorSubject<Array<ItemShoppingCart>>(
    this.items
  )
  constructor() { }

  getItems(): BehaviorSubject<Array<ItemShoppingCart>> {
    
    const cart:string | null = localStorage.getItem('cart');
    if (cart) {
      this.items = JSON.parse(cart)
    }
    this.items$.next(this.items)
    return this.items$;
  }

  addItem(item: ItemShoppingCart) {
    const findItem: ItemShoppingCart | undefined = this.items.find((i) => i.product.id === item.product.id);
    if (findItem){
      findItem.quantity += item.quantity
    }
    else {
      this.items.push(item)
    }
    localStorage.setItem('cart', JSON.stringify(this.items))
    this.items$.next(this.items)
  }

  removeItem(item: ItemShoppingCart) {
    const findItemIndex: number = this.items.findIndex((i) => i.product.id === item.product.id);
    if (findItemIndex >= 0){
      
      this.items[findItemIndex].quantity -= item.quantity;
      if (this.items[findItemIndex].quantity < 1) {
        this.items.splice(findItemIndex, 1);
      }
    }
    localStorage.setItem('cart', JSON.stringify(this.items))
    this.items$.next(this.items);
  }

  setItem(item: ItemShoppingCart) {
    const findItem: ItemShoppingCart | undefined = this.items.find(
      (i) => i.product.id === item.product.id
    )
    if (findItem) {
      if (item.quantity > 0) {
        findItem.quantity = item.quantity
      } else {
        const findItemIndex: number = this.items.findIndex(
          (i) => i.product.id === item.product.id
        )
        this.items.splice(findItemIndex, 1)
      }
    } else {
      this.items.push(item)
    }

    localStorage.setItem('cart', JSON.stringify(this.items))
    this.items$.next(this.items)
  }
  clearAllItems(){
    this.items = new Array<ItemShoppingCart>();
    localStorage.removeItem('cart');
    this.items$.next(this.items);
  }
}
