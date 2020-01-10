import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product, User, Category, Subcategory } from 'src/app/_models';
import { element } from 'protractor';
import { CategoryComponent } from 'src/app/user/category/category.component';

@Component({
  selector: 'app-product-management',
  templateUrl: './product-management.component.html',
  styleUrls: ['./product-management.component.css']
})
export class ProductManagementComponent implements OnInit {

  user: User;
  data: any;
  allCategories: Category[] = [];
  allSubcategories: Subcategory[] = [];
  allProducts: Product[] = [];
  showSuccessMsg = false;
  showErrorMsg = false;
  successMsg: any;
  errorMsg: any;
  refreshed = false;
  currentImageId: any;

  multipleFiles: any;

  constructor(
    public http: HttpClient
  ) {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.user = JSON.parse(localStorage.getItem('currentUser'));
  }

  ngOnInit() {
    this.http.get(
      'https://e-commerce-dev1.herokuapp.com/api/admin/categories'
    ).subscribe(res => {
      this.data = res;
      this.data.forEach(element => {
        this.allCategories.push({ id: element.id, name: element.name });
        element.subcategories.forEach(element1 => {
          this.allSubcategories.push({ categoryId: element.id, id: element1.id, name: element1.name });
          element1.products.forEach(element2 => {
            this.allProducts.push(
              {
                id: element2.id,
                name: element2.name,
                brand: element2.brand,
                description: element2.description,
                price: element2.price,
                subcategoryID: element1.id
              }
            );
          });
        });
      });
      console.log('this resp', this.data);
      console.log('this category', this.allCategories);
      console.log('this subcategory', this.allSubcategories);
      console.log('this allProducts', this.allProducts);
    });
  }

  addNewCategory(formdata: any) {
    this.http.post<any>(
      'https://e-commerce-dev1.herokuapp.com/api/admin/category/add',
      {
        name: formdata.categoryName
      },
      {
        observe: 'response'
      }
    ).subscribe(res => {
      console.log('Save res', res);
      // tslint:disable-next-line: triple-equals
      if (res.status == 200) {
        this.showSuccessMsg = true;
        const that = this;
        this.successMsg = res.body;
        setTimeout(function() {
          that.showSuccessMsg = false;
          this.successMsg = '';
          if (!this.refreshed) {
            location.reload();
            this.refreshed = true;
          }
        }, 3000);
      }
    }, err => {
      console.log('Save error', err);
    });
  }

  addNewSubcategory(formdata: any) {
    this.http.post<any>(
      'https://e-commerce-dev1.herokuapp.com/api/admin/subcategory/add',
      {
        name: formdata.subcategoryName,
        category: {
          id: formdata.category
        }
      },
      {
        observe: 'response'
      }
    ).subscribe(res => {
      console.log('Save res', res);
      // tslint:disable-next-line: triple-equals
      if (res.status == 200) {
        this.showSuccessMsg = true;
        const that = this;
        this.successMsg = res.body;
        setTimeout(function() {
          that.showSuccessMsg = false;
          this.successMsg = '';
          if (!this.refreshed) {
            location.reload();
            this.refreshed = true;
          }
        }, 3000);
      }
    }, err => {
      console.log('Save error', err);
    });
  }

  addNewPruduct(formdata: any) {
    console.log(formdata);
    this.http.post<any>(
      'https://e-commerce-dev1.herokuapp.com/api/admin/product/add',
      {
        name: formdata.name,
        brand: formdata.brand,
        description: formdata.description,
        price: formdata.price,
        image: {
          id: this.currentImageId
        },
        subcategory: {
          id: formdata.subcategory
        }
      },
      {
        observe: 'response'
      }
    ).subscribe(res => {
      console.log('Save res', res);
      // tslint:disable-next-line: triple-equals
      if (res.status == 200) {
        this.showSuccessMsg = true;
        const that = this;
        this.successMsg = res.body;
        setTimeout(function() {
          that.showSuccessMsg = false;
          this.successMsg = '';
          if (!this.refreshed) {
            location.reload();
            this.refreshed = true;
          }
        }, 3000);
      }
    }, err => {
      console.log('Save error', err);
    });
  }

  onClickDeleteCategory(id: any) {
    this.http.delete(
      'https://e-commerce-dev1.herokuapp.com/api/admin/category/delete',
      {
        headers: {},
        params: {
          id: id
        },
        observe: 'response'
      }
    ).subscribe(res => {
      if (res.status === 200) {
        this.showSuccessMsg = true;
        const that = this;
        this.successMsg = res.body;
        setTimeout(function() {
          that.showSuccessMsg = false;
          this.successMsg = '';
          if (!this.refreshed) {
            location.reload();
            this.refreshed = true;
          }
        }, 3000);
      }
    }, err => {
      console.log('Save error', err);
    });
  }

  onClickDeleteSubcategory(id: any) {
    this.http.delete(
      'https://e-commerce-dev1.herokuapp.com/api/admin/subcategory/delete',
      {
        headers: {},
        params: {
          id: id
        },
        observe: 'response'
      }
    ).subscribe(res => {
      if (res.status === 200) {
        this.showSuccessMsg = true;
        const that = this;
        this.successMsg = res.body;
        setTimeout(function() {
          that.showSuccessMsg = false;
          this.successMsg = '';
          if (!this.refreshed) {
            location.reload();
            this.refreshed = true;
          }
        }, 3000);
      }
    }, err => {
      console.log('Save error', err);
    });
  }

  onClickDeleteProduct(id: any) {
    this.http.delete(
      'https://e-commerce-dev1.herokuapp.com/api/admin/product/delete',
      {
        headers: {},
        params: {
          id: id
        },
        observe: 'response'
      }
    ).subscribe(res => {
      if (res.status === 200) {
        this.showSuccessMsg = true;
        const that = this;
        this.successMsg = res.body;
        setTimeout(function() {
          that.showSuccessMsg = false;
          this.successMsg = '';
          if (!this.refreshed) {
            location.reload();
            this.refreshed = true;
          }
        }, 3000);
      }
    }, err => {
      console.log('Save error', err);
    });
  }

  onUpload(info) {
    console.log('fired Event "onUpload"');
    console.log(info);
    if (info.isStored = true) {
      console.log('test');
      this.http.post<any>(
        'https://e-commerce-dev1.herokuapp.com/api/admin/image/add',
        {
          publicPath: info.cdnUrl
        },
        {
          observe: 'response'
        }
      ).subscribe(res => {
        this.currentImageId = res.body.id;
        console.log('Save res', res);
      }, err => {
        console.log('Error', err);
      });
    }
  }

  onProgress(progress) {
    console.log('fired Event "onProgress with data:"');
    console.log(progress);
  }

  onChange(file) {
    if (!file) {
      return;
    }
    console.log('fired Event "onChange"');
    // input file parameter depends on "multiple-files" widget attribute
    if (this.multipleFiles) {
      //  file contains 2 methods:
      //  .promise() - returns the general promise for all uploaded files which resolves into an uploaded file group info
      //  .files() - returns an array of promises: one per each uploaded file. Each promise resolves into an uploaded file info
      console.log(file);
      if (file.promise) {
        file.promise().then((groupInfo) => {
          console.log('resolved general promise from "onChange" with data:');
          console.log(groupInfo);
        });
      }
      if (file.files) {
        file.files().forEach((promise) => {
          promise.then((fileInfo) => {
            console.log('resolves file promise with file info:');
            console.log(fileInfo);
          });
        });
      } else {
        // file contains uploaded file info
        console.log(file);
      }
    }
  }

}
