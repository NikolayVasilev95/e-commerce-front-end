import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { User, ShoppingCart } from 'src/app/_models';
import { NgxGalleryOptions, NgxGalleryImage, NgxGalleryAnimation } from 'ngx-gallery';
import { ShoppingCartComponent } from '../shopping-cart/shopping-cart.component';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {

  @ViewChild(ShoppingCartComponent, { static: false }) childC: ShoppingCartComponent;
  showChild = true;

  user: User;
  getProductID: any;
  imageData: any;
  productImages = {};
  product: any;

  shoppingData: any;
  shoppingCart: ShoppingCart;

  galleryOptions: NgxGalleryOptions[];
  galleryImages: NgxGalleryImage[];

  constructor(
    public http: HttpClient,
    private route: ActivatedRoute
  ) {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.user = JSON.parse(localStorage.getItem('currentUser'));
  }

  ngOnInit() {
    this.http.get(
      `https://e-commerce-dev1.herokuapp.com/api/user/shopping-cart?userId=${this.user.id}`
      ).subscribe(res => {
      this.shoppingData = res;
      this.shoppingCart = this.shoppingData;
    }, err => {
      console.log('error ', err);
    });

    this.getProductID = this.route.snapshot.params.id;
    this.http.get(
      'https://e-commerce-dev1.herokuapp.com/api/user/product',
      {
        headers: {},
        params: {
          id: this.getProductID
        }
      }
    ).subscribe(res => {
      this.product = res;
      console.log('Res ', res);
    }, error => {
      console.log('error ', error);
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

    this.galleryOptions = [
      {
        width: '600px',
        height: '400px',
        thumbnailsColumns: 4,
        imageAnimation: NgxGalleryAnimation.Slide
      },
      // max-width 800
      {
        breakpoint: 800,
        width: '100%',
        height: '600px',
        imagePercent: 80,
        thumbnailsPercent: 20,
        thumbnailsMargin: 20,
        thumbnailMargin: 20
      },
      // max-width 400
      {
        breakpoint: 400,
        preview: false
      }
    ];

    this.galleryImages = [
      {
        small: 'https://ucarecdn.com/d62cc21d-9e20-4874-bb67-f49015c288dd/-/preview/-/resize/150x/',
        medium: 'https://ucarecdn.com/d62cc21d-9e20-4874-bb67-f49015c288dd/-/preview/-/resize/600x/',
        big: 'https://ucarecdn.com/d62cc21d-9e20-4874-bb67-f49015c288dd/'
      },
      {
        small: 'https://ucarecdn.com/383805a5-ee0f-41fb-9cbc-298bf39f623a/',
        medium: 'https://ucarecdn.com/383805a5-ee0f-41fb-9cbc-298bf39f623a/',
        big: 'https://ucarecdn.com/383805a5-ee0f-41fb-9cbc-298bf39f623a/'
      },
      {
        small: 'https://ucarecdn.com/5267157b-d7a6-477a-aa40-350aaae97c79/',
        medium: 'https://ucarecdn.com/5267157b-d7a6-477a-aa40-350aaae97c79/',
        big: 'https://ucarecdn.com/5267157b-d7a6-477a-aa40-350aaae97c79/'
      }
    ];
  }

  addInCard(id: any) {
    console.log(id);
    const producId = id;
    let currentQuantity: number;
    currentQuantity = 1;

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
  }

  onUpdateChild() {
    this.childC.update();
  }

}
