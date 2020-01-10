import { Component, OnInit } from '@angular/core';
import { User, Category } from 'src/app/_models';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

  user: User;
  allCategories: Category[];
  data: any;
  page: Number = 0;
  allPages: Array<any>;
  categoryName:String;
  
  constructor(
    public http: HttpClient
  ) { 
    let currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.user = JSON.parse(localStorage.getItem('currentUser'));
  }

  ngOnInit() {
    this.loadData();
  }

  loadData(){
    this.http.get(
      this.categoryName!=null?
      `/api/user/category-page?page= ${this.page}&name=${this.categoryName}`
      :
      `/api/user/category-page?page= ${this.page}`
    ).subscribe(res => {
      this.data = res;
      this.allPages = new Array(res['totalPages']);
      this.allCategories = this.data.content;
      console.log("this resp", this.data)
    })
  }

  onSearchByName(event: any){
    event.preventDefault();
    this.categoryName = event.target.value;
    this.loadData();
  }

}
