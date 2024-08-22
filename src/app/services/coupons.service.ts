import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CouponsService {

  API_URL = 'http://localhost:3000' //adaptar
  
  constructor(private http: HttpClient) { }

  getCoupons(): Observable<Array<any>>{
    return this.http.get<Array<any>>(`${this.API_URL}/coupons`)
  }
  getCouponsById(couponId:string): Observable<any>{
    return this.http.get<any>(`${this.API_URL}/coupons/${couponId}`).pipe(
      catchError(error => throwError(() => new Error('Failed to fetch coupon')))
    );
  }

  getCouponsByCode(couponCode: string): Observable<any> {
    return this.http.get<any>(`${this.API_URL}/coupons`, { params: { code: couponCode } }).pipe(
      catchError(error => throwError(() => new Error('Failed to fetch coupon')))
    );
  }

  getCouponsPaginate(page:number, perPage:number): Observable<any>{
    return this.http.get<any>(`${this.API_URL}/coupons?_page=${page}&_per_page${perPage}`)
  }
  createCoupon(coupon:any): Observable<any>{
    return this.http.post<any>(`${this.API_URL}/coupons`, coupon)
  }
  editCoupon(coupon:any, couponId:string): Observable<any>{
    return this.http.put<any>(`${this.API_URL}/coupons/${couponId}`, coupon)
  }

  deleteCoupon(couponId: string): Observable<any> {
    return this.http.delete(`${this.API_URL}/coupons/${couponId}`);
  }
}
