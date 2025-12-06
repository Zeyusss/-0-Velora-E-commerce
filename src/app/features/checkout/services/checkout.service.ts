import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class CheckoutService {
  private readonly httpClient = inject(HttpClient);

  postCheckOutSession(cartId: string | null, checkOutData: object): Observable<any> {
    return this.httpClient.post(
      `${environment.baseUrl}/orders/checkout-session/${cartId}?url=http://localhost:4200`,
      checkOutData
    );
  }
}
