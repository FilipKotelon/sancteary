import { NgModule } from "@angular/core";
import { PreloadAllModules, RouterModule, Routes } from "@angular/router";

import { HomeComponent } from "@shop/pages/home/home.component";

const routes: Routes = [
  { path: '', pathMatch: 'full', component: HomeComponent}
]

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}