import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment.development';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly httpClient = inject(HttpClient);
  private readonly cookieService = inject(CookieService);
  private readonly router = inject(Router);

  postSignUp(data: object): Observable<any> {
    return this.httpClient.post(`${environment.baseUrl}/auth/signup`, data);
  }
  postSignIn(data: object): Observable<any> {
    return this.httpClient.post(`${environment.baseUrl}/auth/signin`, data);
  }
  signOut(): void {
    this.cookieService.delete('token');
    this.router.navigate(['/login']);
  }
}
