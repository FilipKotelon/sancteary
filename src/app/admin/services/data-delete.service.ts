import { ProductCategory } from '@shared/models/product-category.model'
import { Product } from './../../shared/models/product.model'
import { Router } from '@angular/router'
import { Store } from '@ngrx/store'
import { DbProductCategory } from './../../shared/models/product-category.model'
import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';

import * as fromApp from '@app/store/app.reducer'
import * as AppMsgActions from '@app/store/app-msg.actions'
import { take, catchError } from 'rxjs/operators';
import { AngularFireStorage } from '@angular/fire/compat/storage'
import { of } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class DataDeleteService {
  private categoriesCollection: AngularFirestoreCollection;
  private productsCollection: AngularFirestoreCollection;
  
  constructor(
    private fireStore: AngularFirestore,
    private store: Store<fromApp.AppState>,
    private storage: AngularFireStorage,
    private router: Router
  ){
    this.categoriesCollection = this.fireStore.collection<DbProductCategory>('product-categories');
    this.productsCollection = this.fireStore.collection<DbProductCategory>('products');
  }

  deleteCategory = (id: string, redirectUrl?: string) => {
    this.categoriesCollection
      .doc(id)
      .get()
      .pipe(
        take(1)
      )
      .subscribe(category => {
        const categoryData = <ProductCategory>category.data();

        if(categoryData){
          this.deleteImage(categoryData.imgUrl);

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
      })
      
  }

  deleteProduct = (id: string, redirectUrl?: string) => {
    this.productsCollection
      .doc(id)
      .get()
      .pipe(
        take(1)
      ).subscribe(product => {
        const productData = <Product>product.data();

        if(productData) {
          this.deleteImage(productData.imgUrl);

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
                new AppMsgActions.AppError(`Product with id "${id}" doesn't exist or an internal error occurred.`)
              )
            })
        } else {
          this.store.dispatch(
            new AppMsgActions.AppError(`Product with id "${id}" doesn't exist or an internal error occurred.`)
          )
        }
      })
  }

  deleteImage = (url) => {
    this.storage.refFromURL(url)
      .delete()
      .pipe(
        take(1),
        catchError(error => {
          return of(
            this.store.dispatch(
              new AppMsgActions.AppError(`Corresponding image was not deleted from storage.`)
            )
          )
        })
      ).subscribe()
  }
}
