import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { AlertService } from '../alert.service';
import { environment } from 'environment';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username!: string;
  password!: string;

  token!: string | null;

  constructor(
    private apiServices: ApiService,
    private alertService: AlertService,
    private authService: AuthService) {
  }

  ngOnInit(): void {
    this.token = this.authService.getToken();
  }

  onLogin() {
    this.apiServices.login(this.username, this.password).subscribe({
      next: (result) => {
        this.token = result.token;
        this.authService.setToken(result.token);
        this.alertService.clear();
      },
      error: (error) => {
        this.alertService.showAPIError(error)
      }
    })
  }

  onLogOut() {
    sessionStorage.clear();
    this.token = "";
  }

}
