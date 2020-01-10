import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User, Order } from 'src/app/_models';
import { of } from 'rxjs';

@Component({
  selector: 'app-order-management',
  templateUrl: './order-management.component.html',
  styleUrls: ['./order-management.component.css']
})
export class OrderManagementComponent implements OnInit {
  user: User;
  data: any;
  currntProduct: any;
  productData: any;
  allOrders: Order[];
  selectedOrder = new Order();

  constructor(
    public http: HttpClient
  ) {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.user = JSON.parse(localStorage.getItem('currentUser'));
  }

  ngOnInit() {
    this.http.get(
      '/api/admin/orders'
    ).subscribe(res => {
      this.data = res;
      this.allOrders = this.data;
    });
  }

  onOrderDetail(id: any) {
    this.selectedOrder = this.findOrderById(id);
    console.log('Selected order', this.selectedOrder);
  }

  findOrderById(id: number): Order {
    let theOrder: Order = new Order();
    for (const order of this.allOrders) {
      if (order.id === id) {
        theOrder = order;
        break;
      }
    }
    return theOrder;
  }

}
