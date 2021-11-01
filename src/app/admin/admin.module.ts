import { SharedModule } from './../shared/shared.module'
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { NavComponent } from './components/nav/nav.component';
import { AdminRoutingModule } from './admin-routing.module';
import { WelcomeComponent } from './pages/welcome/welcome.component';
import { ProductsComponent } from './pages/products/products.component';
import { CategoriesComponent } from './pages/categories/categories.component';
import { OrdersComponent } from './pages/orders/orders.component';
import { ProductEditComponent } from './pages/products/product-edit/product-edit.component';
import { OrderEditComponent } from './pages/orders/order-edit/order-edit.component';
import { CategoriesEditComponent } from './pages/categories/categories-edit/categories-edit.component';
import { TextFieldComponent } from './components/inputs/text-field/text-field.component';
import { NumericFieldComponent } from './components/inputs/numeric-field/numeric-field.component';
import { SelectFieldComponent } from './components/inputs/select-field/select-field.component';



@NgModule({
  declarations: [
    AdminComponent,
    SidebarComponent,
    NavComponent,
    WelcomeComponent,
    ProductsComponent,
    CategoriesComponent,
    OrdersComponent,
    ProductEditComponent,
    OrderEditComponent,
    CategoriesEditComponent,
    TextFieldComponent,
    NumericFieldComponent,
    SelectFieldComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    SharedModule
  ]
})
export class AdminModule { }
