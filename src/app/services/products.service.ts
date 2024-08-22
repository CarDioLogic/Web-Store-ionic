import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  API_URL = 'http://localhost:3000' //adaptar
  
  constructor(private http: HttpClient) { }

  getProducts(): Observable<Array<any>>{
    return this.http.get<Array<any>>(`${this.API_URL}/products`)
  }
  getProductsById(productId:number): Observable<any>{
    return this.http.get<any>(`${this.API_URL}/products/${productId}`)
  }

  getProductsPaginate(page:number, perPage:number): Observable<any>{
    return this.http.get<any>(`${this.API_URL}/products?_page=${page}&_per_page${perPage}`)
  }
  createProduct(product:any): Observable<any>{
    return this.http.post<any>(`${this.API_URL}/products`, product)
  }
  editProduct(product:any, productId:number): Observable<any>{
    return this.http.put<any>(`${this.API_URL}/products/${productId}`, product)
  }

  deleteProduct(productId: number): Observable<any> {
    return this.http.delete(`${this.API_URL}/products/${productId}`);
  }
}
