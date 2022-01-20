import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { LoginResponse, User } from '@bg-ng/api-interfaces';

@Component({
  selector: 'bg-ng-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  user?: User;
  constructor(private readonly http: HttpClient) {}

  ngOnInit(): void {
    this.http.get<User>('users/me').subscribe((user) => (this.user = user));
  }
}
