import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from 'src/app/_models';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.css']
})
export class UserManagementComponent implements OnInit {
  user: User;
  showSelect: any = {
    id: <any>[],
    status: <any>[]
  };
  showSpan: any = {
    id: <any>[],
    status: <any>[]
  };
  usersData: any;
  rolesData: any = [{ name: 'ADMIN' }, { name: 'USER' }];
  selectedButton = {};
  selectedRole: any;
  selectedRoleData: any;
  showSuccessMsg: boolean = false;
  showErrorMsg: boolean = false;
  successMsg: any;
  errorMsg: any;
  refreshed: boolean = false;

  constructor(
    public http: HttpClient
  ) {
    let currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.user = JSON.parse(localStorage.getItem('currentUser'));
  }

  ngOnInit() {
    this.http.get(
      '/api/admin/user-management'
    ).subscribe(res => {
      this.usersData = res;
      this.usersData.forEach(item => {
        this.showSelect.id[item.id] = item.id;
        this.showSelect.status[item.id] = false;
        this.showSpan.id[item.id] = item.id;
        this.showSpan.status[item.id] = true;
      });
    })
  }

  onEditClick(id: any) {
    this.selectedButton[id] = !this.selectedButton[id];
    if (this.selectedButton[id] == true) {
      this.showSpan.id.forEach(item => {
        if (item == id) {
          this.showSpan.status[item] = false;
          this.showSelect.status[item] = true;
          return;
        }
      });
    } else {
      this.showSpan.id.forEach(item => {
        if (item == id) {
          this.showSpan.status[item] = true;
          this.showSelect.status[item] = false;
          return;
        }
      });
    }
  }

  onDeleteClick(id: any) {
    this.http.delete(
      '/api/admin/user-management/delete',
      {
        headers: {},
        params: {
          id: id
        },
        observe: 'response'
      }
    ).subscribe(res => {
      res.statusText === "No Content" ? window.location.reload(true) : ''
    });
  }

  onChangeRole(id: any) {
    this.selectedRoleData = this.selectedRole;
  }

  onSaveClick(id: number) {
   this.http.post<any>(
      '/api/admin/user-management/save',
      {
        userId: id,
        roleName: this.selectedRoleData
      },
      {
        observe: 'response'
      }
    ).subscribe(res => {
      console.log("Save res", res);
      if (res.status == 200) {
        this.showSuccessMsg = true;
        let that = this;
        this.successMsg = res.body;
        setTimeout(function () {
          that.showSuccessMsg = false;
          this.successMsg = "";
          if(!this.refreshed){
            location.reload();
            this.refreshed = true;
          }
        }, 3000);
      }
    }, err => {
      console.log("Save error", err);
      if (err.status == 400) {
        this.errorMsg = err.error.details;
        this.showErrorMsg = true;
        let that = this;
        setTimeout(function () {
          that.showErrorMsg = false;
        }, 3000);
      }
    });
  }

}
