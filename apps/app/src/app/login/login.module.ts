import { NgModule } from '@angular/core';
import { LoginComponent } from './login.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { LoginService } from './login.service';

@NgModule({
  declarations: [LoginComponent],
  imports: [
    RouterModule.forChild([
      {
        path: '',
        component: LoginComponent,
      },
    ]),
    SharedModule,
  ],
  providers: [LoginService],
})
export class LoginModule {}
