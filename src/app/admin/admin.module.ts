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
import { EditComponent } from './pages/products/edit/edit.component';



@NgModule({
  declarations: [
    AdminComponent,
    SidebarComponent,
    NavComponent,
    WelcomeComponent,
    ProductsComponent,
    CategoriesComponent,
    OrdersComponent,
    EditComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule
  ]
})
export class AdminModule { }
