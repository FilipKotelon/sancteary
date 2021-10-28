import { SharedModule } from '@shared/shared.module'
import { ShopRoutingModule } from './shop-routing.module'
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './pages/home/home.component';
import { ShopComponent } from './shop.component';
import { AuthModule } from '@auth/auth.module';



@NgModule({
  declarations: [
    HomeComponent,
    ShopComponent,
  ],
  imports: [
    CommonModule,
    ShopRoutingModule,
    SharedModule
  ]
})
export class ShopModule { }
