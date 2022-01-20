import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from './login.service';

@Component({
  selector: 'bg-ng-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm = this.fb.group({
    username: ['', [Validators.required]],
    password: ['', [Validators.required]],
  });
  constructor(
    private readonly fb: FormBuilder,
    private readonly service: LoginService,
    private readonly router: Router
  ) {}

  ngOnInit(): void {
    console.log('This is a test');
  }

  login() {
    this.service.login(this.loginForm.value).subscribe(() => {
      this.router.navigate(['dashboard']);
    });
  }
}
