import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthenticationService } from '../_services/authentication.service';
import { Router, ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  errormsg = false;
  model: any = {};
  returnUrlAdmin: string;
  returnUrlUser: string;

  constructor(
    public http: HttpClient,
    public authenticationService: AuthenticationService,
    public router: Router,
    public route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.authenticationService.logout();
    this.returnUrlAdmin = this.route.snapshot.queryParams.returnUrl || '/admin';
    this.returnUrlUser = this.route.snapshot.queryParams.returnUrl || '/home';
  }

  onLoginClick() {
    this.errormsg = false;
    this.authenticationService.login(this.model.username, this.model.password)
      .subscribe(
        data => {
          let role = data.body.roles[0].name;
          if (role === 'ADMIN') {
            this.router.navigate([this.returnUrlAdmin])
          } else if (role === 'USER') {
            this.router.navigate([this.returnUrlUser])
          }
        },
        error => {
          if (error.status == 404) {
            this.errormsg = true
          }
        });
  }

}
