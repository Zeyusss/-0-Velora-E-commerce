import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private readonly httpClient = inject(HttpClient);

  postAddProductToCart(productId: string | null): Observable<any> {
    return this.httpClient.post(`${environment.baseUrl}/cart`, {
      productId: productId,
    });
  }
  getLoggedUserCart(): Observable<any> {
    return this.httpClient.get(`${environment.baseUrl}/cart`);
  }
  removeItemFromCart(productId: string): Observable<any> {
    return this.httpClient.delete(`${environment.baseUrl}/cart/${productId}`);
  }
  putCartItemCount(productId: string, count: number): Observable<any> {
    return this.httpClient.put(`${environment.baseUrl}/cart/${productId}`, {
      count: count,
    });
  }
  deleteAllCartItems(): Observable<any> {
    return this.httpClient.delete(`${environment.baseUrl}/cart`);
  }
}
