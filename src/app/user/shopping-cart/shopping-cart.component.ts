import { Component, OnInit } from '@angular/core';
import { ProductOrder, Product, User, ShoppingCartDetail } from 'src/app/_models';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {

  user: User;
  showCards = false;
  totalPrice: number;
  totalPriceOutput: string;
  showSucssesMsg = false;
  showErrorMsg = false;
  errorMsg: any;
  data: any;
  shoppingCartDetail: ShoppingCartDetail[] = [];
  refreshed = false;

  constructor(
    public http: HttpClient
  ) {
    this.user = JSON.parse(localStorage.getItem('currentUser'));
  }

  update() {
    this.ngOnInit();
  }

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this.http.get(
      `https://e-commerce-dev1.herokuapp.com/api/user/shopping-cart?userId=${this.user.id}`
      ).subscribe(res => {
      console.log('Resp shoping Cart ', res);
      this.data = res;
      this.shoppingCartDetail = this.data.shoppingCartDetails;
      console.log('ShoppingCartDetail ', this.shoppingCartDetail);
      this.calculateTotalPrice();
    }, error => {
      console.log('error ', error);
    });
  }

  calculateTotalPrice() {
    this.totalPrice = 0;
    this.shoppingCartDetail.forEach(element  => {
      console.log(true);
      this.totalPrice += element.products.price * element.quantity;
    });
    this.totalPriceOutput = this.totalPrice.toFixed(2);
  }

  showCard($event) {
    this.showCards = !this.showCards;
  }

  onCheckout($event) {
    const order: ProductOrder[] = [];
    this.shoppingCartDetail.forEach(element  => {
      order.push(new ProductOrder(element.products.id, element.quantity));
    });

    this.http.post(
      'https://e-commerce-dev1.herokuapp.com/api/user/order/add',
      {
        products: order,
        userId: this.user.id
      },
      {
        observe: 'response'
      }
    ).subscribe(res => {
      if (res.status === 201) {
        this.totalPrice = 0;
        this.showSucssesMsg = true;
        const that = this;
        setTimeout(function() {
          that.showSucssesMsg = false;
          that.update();
        }, 3000);
      }
    }, error => {
      if (error.status === 404) {
        this.errorMsg = error.error;
      }
      if (error.status === 400) {
        this.errorMsg = error.error.details;
        this.showErrorMsg = true;
        const that = this;
        setTimeout(function() {
          that.showErrorMsg = false;
        }, 3000);
      }
    });
  }

  onDeleteClick(id: any) {
    console.log(id);
    this.http.delete(
      'https://e-commerce-dev1.herokuapp.com/api/user/shopping-cart-details/delete',
      {
        headers: {},
        params: {
          id: id
        },
        observe: 'response'
      }
    ).subscribe(res => {
      if (res.status === 200) {
        this.ngOnInit();
      }
    });
  }

}
