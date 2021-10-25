import { AppRoutingModule } from './app-routing.module'
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { StoreModule } from '@ngrx/store';

import { AppComponent } from './app.component';

import * as fromApp from './store/app.reducer';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    StoreModule.forRoot(fromApp.appReducer)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
