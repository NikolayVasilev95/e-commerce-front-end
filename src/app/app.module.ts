import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { Ng5SliderModule } from 'ng5-slider';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './user/home/home.component';
import { IndexComponent } from './index/index.component';
import { AdminPanelComponent } from './admin/admin-panel/admin-panel.component';
import { UserManagementComponent } from './admin/user-management/user-management.component';
import { AuthenticationService } from './_services/authentication.service'
import { AuthGuardAdmin, AuthGuardUser } from './_guards/auth.guardService';
import { ProductComponent } from './user/product/product.component';
import { ProductManagementComponent} from './admin/product-management/product-management.component';
import { OrderManagementComponent} from './admin/order-management/order-management.component';
import { UserMainNavComponent } from './user/user-main-nav/user-main-nav.component';
import { UserFooterComponent } from './user/user-footer/user-footer.component';
import { AdminMainNavComponent } from './admin/admin-main-nav/admin-main-nav.component';
import { AdminFooterComponent } from './admin/admin-footer/admin-footer.component';
import { CategoryComponent } from './user/category/category.component';
import { SubcategoryComponent} from './user/subcategory/subcategory.component';
import { RatingModule } from 'ng-starrating';
import { UcWidgetModule } from 'ngx-uploadcare-widget';
import { ProductDetailComponent } from './user/product-detail/product-detail.component';
import { NgxGalleryModule } from 'ngx-gallery';
import { ShoppingCartComponent } from './user/shopping-cart/shopping-cart.component';

@NgModule({
   declarations: [
      AppComponent,
      RegisterComponent,
      LoginComponent,
      HomeComponent,
      IndexComponent,
      AdminPanelComponent,
      UserManagementComponent,
      ProductComponent,
      ProductManagementComponent,
      OrderManagementComponent,
      UserMainNavComponent,
      UserFooterComponent,
      AdminMainNavComponent,
      AdminFooterComponent,
      CategoryComponent,
      SubcategoryComponent,
      ProductDetailComponent,
      ShoppingCartComponent
   ],
   imports: [
      BrowserModule,
      AppRoutingModule,
      HttpClientModule,
      FormsModule,
      Ng5SliderModule,
      RatingModule,
      UcWidgetModule,
      NgxGalleryModule
   ],
   providers: [AuthenticationService, AuthGuardAdmin, AuthGuardUser],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule { }
