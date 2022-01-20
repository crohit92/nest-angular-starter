import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs';
import { StorageService } from '../core/services/utilities/storage.service';
import { StorageKeys } from '../shared/constants/storage-keys';
import { LoginResponse } from '../shared/models/login.response';

@Injectable()
export class LoginService {
  constructor(
    private readonly http: HttpClient,
    private readonly storage: StorageService
  ) {}
  login({ username, password }: { username: string; password: string }) {
    return this.http
      .post<LoginResponse>(`users/auth/login`, {
        username,
        password,
      })
      .pipe(
        tap((res) => {
          this.storage.setItem(StorageKeys.AccessToken, res.accessToken);
        })
      );
  }
}
