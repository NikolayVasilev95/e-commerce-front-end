import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/_models';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  user: User;

  constructor() {
    let currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.user = JSON.parse(localStorage.getItem('currentUser'));
   }

  ngOnInit() {
  }

}
