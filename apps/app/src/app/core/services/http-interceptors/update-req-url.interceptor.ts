import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable()
export class UpdateReqUrlInterceptor implements HttpInterceptor {
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    console.log(req.url);
    console.log(req.urlWithParams);
    const clone = req.clone({
      url: `${environment.apiBaseUrl}/${req.urlWithParams}`,
    });
    return next.handle(clone);
  }
}
