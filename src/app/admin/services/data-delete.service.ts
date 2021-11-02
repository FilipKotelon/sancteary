import { Router } from '@angular/router'
import { Store } from '@ngrx/store'
import { DbProductCategory } from './../../shared/models/product-category.model'
import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';

import * as fromApp from '@app/store/app.reducer'
import * as AppMsgActions from '@app/store/app-msg.actions'

@Injectable({
  providedIn: 'root'
})
export class DataDeleteService {
  private categoriesCollection: AngularFirestoreCollection;
  private productsCollection: AngularFirestoreCollection;
  
  constructor(
    private fireStore: AngularFirestore,
    private store: Store<fromApp.AppState>,
    private router: Router
  ){
    this.categoriesCollection = this.fireStore.collection<DbProductCategory>('product-categories');
    this.productsCollection = this.fireStore.collection<DbProductCategory>('product-categories');
  }

  deleteCategory = (id: string, redirectUrl?: string) => {
    this.categoriesCollection
      .doc(id)
      .delete()
      .then(() => {
        this.store.dispatch(
          new AppMsgActions.AppInfo('Category deleted.')
        )

        if(redirectUrl){
          this.router.navigate([redirectUrl]);
        }
      })
      .catch(error => {
        console.log(error);

        this.store.dispatch(
          new AppMsgActions.AppError(`Category with id "${id}" doesn't exist or an internal error occurred.`)
        )
      })
  }

  deleteProduct = (id: string, redirectUrl?: string) => {
    this.productsCollection
      .doc(id)
      .delete()
      .then(() => {
        this.store.dispatch(
          new AppMsgActions.AppInfo('Product deleted.')
        )

        if(redirectUrl){
          this.router.navigate([redirectUrl]);
        }
      })
      .catch(error => {
        console.log(error);

        this.store.dispatch(
          new AppMsgActions.AppError(`Category with id "${id}" doesn't exist or an internal error occurred.`)
        )
      })
  }
}
