import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Options, LabelType } from 'ng5-slider';
import { Product, ProductOrder, User, Image, ShoppingCart } from '../../_models';
import { ActivatedRoute } from '@angular/router';
import { isNumber, error } from 'util';
import { StarRatingComponent } from 'ng-starrating';
import { ShoppingCartComponent } from '../shopping-cart/shopping-cart.component';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  @ViewChild(ShoppingCartComponent, { static: false }) childC: ShoppingCartComponent;
  showChild = true;

  user: User;
  allProducts: Product[];
  data: any;
  showSucssesMsg = false;
  showErrorMsg = false;
  errorMsg: any;
  page = 0;
  allPages: Array<any>;
  productName: string;
  productBrand: string;
  getSubcategoryID: any;
  showProducts = true;
  showNoProducts = false;
  imageData: any;
  shoppingData: any;
  shoppingCart: ShoppingCart;
  brands = new Map<string, number>();

  productImages = {};

  minValue = 0;
  maxValue = 400;
  options: Options = {
    floor: 0,
    ceil: 500,
    translate: (value: number, label: LabelType): string => {
      switch (label) {
        case LabelType.Low:
          return '<b>Min price:</b> $' + value;
        case LabelType.High:
          return '<b>Max price:</b> $' + value;
        default:
          return '$' + value;
      }
    }
  };

  constructor(
    public http: HttpClient,
    private route: ActivatedRoute
  ) {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.user = JSON.parse(localStorage.getItem('currentUser'));
    this.route.paramMap.subscribe(params => {
      this.ngOnInit();
    });
  }

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this.http.get(
      `https://e-commerce-dev1.herokuapp.com/api/user/shopping-cart?userId=${this.user.id}`
      ).subscribe(res => {
      this.shoppingData = res;
      this.shoppingCart = this.shoppingData;
    }, err => {
      console.log('error ', err);
    });

    this.http.get('https://e-commerce-dev1.herokuapp.com/api/user/images').subscribe(res => {
      console.log('Image res ', res);
      this.imageData = res;
      this.imageData.forEach(element => {
        element.products.forEach(product => {
          // ima li producId v allImages
          if (Object.keys(this.productImages).includes(product.id)) {
            // todo - implement logic find primary image or any extra checks
            this.productImages[product.id] = element.publicPath;
          } else {
            this.productImages[product.id] = element.publicPath;
          }
          // dali ima snimka za tozi produckt
        });
      });
      console.log(this.productImages);
    }, error => {
      console.log('error ', error);
    });

    this.getSubcategoryID = this.route.snapshot.params.id;
    this.http.get(
      this.productName != null ?
        `https://e-commerce-dev1.herokuapp.com/api/user/product-page?page=${this.page}&name=${this.productName}&subcategoryId=${this.getSubcategoryID}`
        :
        `https://e-commerce-dev1.herokuapp.com/api/user/product-page?page=${this.page}&subcategoryId=${this.getSubcategoryID}`
    ).subscribe(res => {
      this.data = res;
      this.allPages = new Array(res['totalPages']);
      this.allProducts = this.data.content;
      if (this.data.totalElements === 0) {
        this.showProducts = false;
        this.showNoProducts = true;
      } else {
        this.showProducts = true;
        this.showNoProducts = false;
      }
      console.log('this resp', this.data);
      this.brand();
    });
  }

  addInCard(id: any, formdata: any) {
    const producId = id;
    let currentQuantity: number;
    currentQuantity = isNumber(formdata.quantity) && formdata.quantity >= 1 ? formdata.quantity : 1;

    this.http.post(
      'https://e-commerce-dev1.herokuapp.com/api/user/shopping-cart-details/add',
      {
        shoppingCart: {
          id: this.shoppingCart.id
        },
        products: {
          id: producId
        },
        quantity: currentQuantity
      },
      {
        observe: 'response'
      }
    ).subscribe(res => {
      console.log('Res ', res);
      if (res.statusText === 'OK') {
        this.onUpdateChild();
      }
    }, err => {
      console.log('Error ', err);
    });

    formdata.quantity = null;
  }

  setPage(i, $event: any) {
    $event.preventDefault();
    this.page = i;
    this.loadData();
  }

  onSearchByName(event: any) {
    event.preventDefault();
    this.productName = event.target.value;
    this.loadData();
  }

  onRate($event: { oldValue: number, newValue: number, starRating: StarRatingComponent }) {
    alert(`Old Value:${$event.oldValue},
      New Value: ${$event.newValue},
      Checked Color: ${$event.starRating.checkedcolor},
      Unchecked Color: ${$event.starRating.uncheckedcolor}`);
  }

  onUpdateChild() {
    this.childC.update();
  }

  brand() {
    this.brands.clear();
    for (const product of this.allProducts) {
      this.brands.set(product.brand, product.id);
    }
  }
}
