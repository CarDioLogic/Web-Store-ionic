import { Contacts } from './contacts';

export interface Order {
    products: Array<OrderProduct>;
    cupao: string;
    valorFinal:number,
    dadosContato: Contacts
  }

  export interface OrderProduct{
    productId: number,
    quantidade: number
  }
