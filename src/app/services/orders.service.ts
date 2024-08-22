import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators'; 

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  API_URL = 'http://localhost:3000' 
  
  constructor(private http: HttpClient) { }

  getOrders(): Observable<Array<any>>{
    return this.http.get<Array<any>>(`${this.API_URL}/orders`)
  }
  getOrdersById(orderId:number): Observable<any>{
    return this.http.get<any>(`${this.API_URL}/orders/${orderId}`)
  }

  fetchOrdersByUserName(userName: string): Observable<any[]> {
    return this.getOrders().pipe(
      map(orders => orders.filter(order => order.dadosContato.nome === userName)),
      catchError(error => throwError(() => new Error('Error fetching orders')))
    );
  }

  getOrdersPaginate(page:number, perPage:number): Observable<any>{
    return this.http.get<any>(`${this.API_URL}/orders?_page=${page}&_per_page${perPage}`)
  }
  createOrder(order:any): Observable<any>{
    return this.http.post<any>(`${this.API_URL}/orders`, order)
  }
  editOrder(order:any, orderId:number): Observable<any>{
    return this.http.put<any>(`${this.API_URL}/orders/${orderId}`, order)
  }

  deleteOrder(orderId: number): Observable<any> {
    return this.http.delete(`${this.API_URL}/orders/${orderId}`);
  }
}
