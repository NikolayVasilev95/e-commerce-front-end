import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductComponent } from './user/product/product.component';
import { IndexComponent } from './index/index.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { AdminPanelComponent } from './admin/admin-panel/admin-panel.component';
import { UserManagementComponent } from './admin/user-management/user-management.component';
import { HomeComponent } from './user/home/home.component';
import { AuthGuardAdmin, AuthGuardUser } from './_guards/auth.guardService';
import { ProductManagementComponent } from './admin/product-management/product-management.component';
import { OrderManagementComponent } from './admin/order-management/order-management.component';
import { CategoryComponent } from './user/category/category.component';
import { SubcategoryComponent } from './user/subcategory/subcategory.component';
import { ProductDetailComponent } from './user/product-detail/product-detail.component';


const routes: Routes = [
   { path: '', component: IndexComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  // All the Admin URL
  { path: 'admin', component: AdminPanelComponent, canActivate: [AuthGuardAdmin] },
  { path: 'user-management', component: UserManagementComponent, canActivate: [AuthGuardAdmin] },
  { path: 'product-management', component: ProductManagementComponent, canActivate: [AuthGuardAdmin] },
  { path: 'order-management', component: OrderManagementComponent, canActivate: [AuthGuardAdmin] },
  // All the User URL
  { path: 'home', component: HomeComponent, canActivate: [AuthGuardUser] },
  { path: 'category', component: CategoryComponent, canActivate: [AuthGuardUser] },
  { path: 'subcategory/:id', component: SubcategoryComponent, canActivate: [AuthGuardUser] },
  { path: 'product/:id', component: ProductComponent, canActivate: [AuthGuardUser] },
  { path: 'product-detail/:id', component: ProductDetailComponent, canActivate: [AuthGuardUser] }
];

@NgModule({
   imports: [
      RouterModule.forRoot(routes)
   ],
   exports: [
      RouterModule
   ]
})
export class AppRoutingModule { }
