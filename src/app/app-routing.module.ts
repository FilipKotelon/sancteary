import { AdminGuard } from './auth/guards/admin.guard'
import { NgModule } from "@angular/core";
import { PreloadAllModules, RouterModule, Routes } from "@angular/router";

const routes: Routes = [
  { 
    path: '',
    pathMatch: 'full',
    loadChildren: () => import("@shop/shop.module").then(m => m.ShopModule) ,
  },
  {
    path: 'profile',
    loadChildren: () => import('@auth/auth.module').then(m => m.AuthModule)
  },
  {
    path: 'admin',
    canActivate: [AdminGuard],
    loadChildren: () => import('@admin/admin.module').then(m => m.AdminModule)
  },
]

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}