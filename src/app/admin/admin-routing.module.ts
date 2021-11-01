import { ProductEditComponent } from './pages/products/product-edit/product-edit.component'
import { CategoriesEditComponent } from './pages/categories/categories-edit/categories-edit.component'
import { OrdersComponent } from './pages/orders/orders.component'
import { ProductsComponent } from './pages/products/products.component'
import { CategoriesComponent } from './pages/categories/categories.component'
import { WelcomeComponent } from './pages/welcome/welcome.component'
import { AdminComponent } from './admin.component'
import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { OrderEditComponent } from './pages/orders/order-edit/order-edit.component'

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
        },
      },
      {
        path: 'categories',
        children: [
          {
            path: 'new',
            component: CategoriesEditComponent,
            data: {
              animation: '21'
            },
          },
          {
            path: 'edit/:id',
            component: CategoriesEditComponent,
            data: {
              animation: '22'
            },
          }
        ]
      },
      {
        path: 'orders',
        pathMatch: 'full',
        component: OrdersComponent,
        data: {
          animation: '3'
        },
        children: [
          {
            path: 'edit/:id',
            component: OrderEditComponent,
            data: {
              animation: '31'
            },
          }
        ]
      },
      {
        path: 'products',
        pathMatch: 'full',
        component: ProductsComponent,
        data: {
          animation: '4'
        },
      },
      {
        path: 'products',
        children: [
          {
            path: 'new',
            component: ProductEditComponent,
            data: {
              animation: '41'
            },
          },
          {
            path: 'edit/:id',
            component: ProductEditComponent,
            data: {
              animation: '42'
            },
          }
        ]
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