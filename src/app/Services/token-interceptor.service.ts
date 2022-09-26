import { HttpEvent, HttpHandler, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';
import { catchError, Observable, throwError } from 'rxjs';
import { AuthService } from '../features/authentification/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService {

  constructor(private authService: AuthService, private messageService: MessageService,) {}
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const { Token } = this.authService.MemberConnected;
    if (Token) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${Token}`,
        },
      });
    }
    return next.handle(request)
  }



  
}
 