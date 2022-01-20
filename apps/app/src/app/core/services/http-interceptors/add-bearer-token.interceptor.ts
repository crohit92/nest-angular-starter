import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { StorageKeys } from '../../../shared/constants/storage-keys';
import { StorageService } from '../utilities/storage.service';

@Injectable()
export class AddBearerTokenInterceptor implements HttpInterceptor {
  constructor(private readonly storage: StorageService) {}
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const clone = req.clone({
      headers: req.headers.append(
        'authorization',
        `bearer ${this.storage.getItem(StorageKeys.AccessToken)}`
      ),
    });
    return next.handle(clone);
  }
}
