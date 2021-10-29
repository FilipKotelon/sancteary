import { OrdersComponent } from './pages/orders/orders.component'
import { ProductsComponent } from './pages/products/products.component'
import { CategoriesComponent } from './pages/categories/categories.component'
import { WelcomeComponent } from './pages/welcome/welcome.component'
import { AdminComponent } from './admin.component'
import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        component: WelcomeComponent,
        data: {
          animation: '1'
        }
      },
      {
        path: 'categories',
        pathMatch: 'full',
        component: CategoriesComponent,
        data: {
          animation: '2'
        }
      },
      {
        path: 'orders',
        pathMatch: 'full',
        component: OrdersComponent,
        data: {
          animation: '3'
        }
      },
      {
        path: 'products',
        pathMatch: 'full',
        component: ProductsComponent,
        data: {
          animation: '4'
        }
      }
    ]
  },
]

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class AdminRoutingModule {}