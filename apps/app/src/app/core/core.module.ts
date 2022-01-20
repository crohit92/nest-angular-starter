import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { UpdateReqUrlInterceptor } from './services/http-interceptors/update-req-url.interceptor';
import { AddBearerTokenInterceptor } from './services/http-interceptors/add-bearer-token.interceptor';
import { StorageService } from './services/utilities/storage.service';

@NgModule({
  declarations: [],
  imports: [CommonModule, HttpClientModule],
  exports: [CommonModule, HttpClientModule],
  providers: [
    {
      provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
      useValue: {
        appearance: 'outline',
        floatLabel: 'always',
      },
    },
    StorageService,
    {
      provide: HTTP_INTERCEPTORS,
      multi: true,
      useClass: UpdateReqUrlInterceptor,
    },
    {
      provide: HTTP_INTERCEPTORS,
      multi: true,
      useClass: AddBearerTokenInterceptor,
    },
  ],
})
export class CoreModule {}
