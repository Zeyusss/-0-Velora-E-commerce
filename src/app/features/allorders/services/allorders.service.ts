import { AuthService } from './../../../core/auth/services/auth.service';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment.development';
import { CookieService } from 'ngx-cookie-service';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class AllordersService {
  private readonly httpClient = inject(HttpClient);
  private readonly cookieService = inject(CookieService);
  private readonly authService = inject(AuthService);
  getUserOrders(userId: string): Observable<any> {
    return this.httpClient.get(`${environment.baseUrl}/orders/user/${userId}`);
  }

  decodeToken() {
    let token;

    try {
      token = jwtDecode(this.cookieService.get('token'));
    } catch (error) {
      this.authService.signOut();
    }
    return token;
  }
}
