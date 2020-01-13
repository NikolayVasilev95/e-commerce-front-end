import { Component, OnInit } from '@angular/core';
import { User, Category, Subcategory } from 'src/app/_models';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-user-main-nav',
  templateUrl: './user-main-nav.component.html',
  styleUrls: ['./user-main-nav.component.css']
})
export class UserMainNavComponent implements OnInit {

  user: User;
  data: any;
  category: Category[] = [];
  subcategory: Subcategory[] = [];

  constructor(
    public http: HttpClient
  ) {
    let currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.user = JSON.parse(localStorage.getItem('currentUser'));
  }

  ngOnInit() {
    this.http.get<any>(
      'https://e-commerce-dev1.herokuapp.com/api/user/categories',
      { observe: 'response', withCredentials: true }
    ).subscribe(res => {
      console.log('res ', res);
      this.data = res.body;
      this.data.forEach(el => {
        this.category.push({ id: el.id, name: el.name })
        el.subcategories.forEach(element => {
          this.subcategory.push({categoryId: el.id, id: element.id, name: element.name})
        });
      });
    }, error => {
      console.log("Category error ", error);
    });
  }

}
