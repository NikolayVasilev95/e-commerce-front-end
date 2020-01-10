import { Component, OnInit } from '@angular/core';
import { User, Subcategory } from 'src/app/_models';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-subcategory',
  templateUrl: './subcategory.component.html',
  styleUrls: ['./subcategory.component.css']
})
export class SubcategoryComponent implements OnInit {

  user: User;
  allSubcategories: Subcategory[];
  data: any;
  page: Number = 0;
  allPages: Array<any>;
  subcategoryName:String;
  getCategoryID: any;

  constructor(
    public http: HttpClient,
    private route: ActivatedRoute
  ) { 
    let currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.user = JSON.parse(localStorage.getItem('currentUser'));
  }

  ngOnInit() {
    this.loadData();
  }

  loadData(){
    this.getCategoryID = this.route.snapshot.params.id;
    this.http.get(
      this.subcategoryName!=null?
      `https://e-commerce-dev1.herokuapp.com/api/user/subcategory-page?page=${this.page}&name=${this.subcategoryName}&categoryId=${this.getCategoryID}`
      :
      `https://e-commerce-dev1.herokuapp.com/api/user/subcategory-page?page=${this.page}&categoryId=${this.getCategoryID}`
    ).subscribe(res => {
      this.data = res;
      this.allPages = new Array(res['totalPages']);
      this.allSubcategories = this.data.content;
      console.log("this resp", this.data)
    })
  }

  onSearchByName(event: any){
    event.preventDefault();
    this.subcategoryName = event.target.value;
    this.loadData();
  }

}
