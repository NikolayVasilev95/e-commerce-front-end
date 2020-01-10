import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/_models';

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.css']
})
export class AdminPanelComponent implements OnInit {

  user: User;
  
  constructor() {
    let currentUser = JSON.parse(localStorage.getItem('currentUser'));
    // this.user.id = currentUser.id;
    // this.user.name = currentUser.name;
    // this.user.firstName = currentUser.firstName;
    // this.user.lastName = currentUser.lastName;
    // this.user.email = currentUser.email;
    this.user = JSON.parse(localStorage.getItem('currentUser'));
  }

  ngOnInit() {
  }

}
