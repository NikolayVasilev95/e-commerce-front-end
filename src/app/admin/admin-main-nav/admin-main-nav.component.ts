import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/_models';

@Component({
  selector: 'app-admin-main-nav',
  templateUrl: './admin-main-nav.component.html',
  styleUrls: ['./admin-main-nav.component.css']
})
export class AdminMainNavComponent implements OnInit {

  user: User;

  constructor() {
    let currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.user = JSON.parse(localStorage.getItem('currentUser'));
   }

  ngOnInit() {
  }

}
