import { take } from 'rxjs/operators'
import { DbProductCategory, ProductCategory } from '@shared/models/product-category.model'
import { Store } from '@ngrx/store'
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore'
import { DataDeleteService } from '@admin/services/data-delete.service'
import { FormGroup, FormControl, Validators } from '@angular/forms'
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EditableOrNew } from '@admin/utility/editable-or-new.class';

import * as AppMsgActions from '@app/store/app-msg.actions'
import * as fromApp from '@app/store/app.reducer'
import { Product } from '@shared/models/product.model'

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.scss']
})
export class ProductEditComponent extends EditableOrNew {
  form: FormGroup;
  categoriesCollection: AngularFirestoreCollection;
  categoriesOptions = {};
  productsCollection: AngularFirestoreCollection;
  acceptPopupOpen = false;

  constructor(
    protected route: ActivatedRoute,
    private router: Router,
    private fireStore: AngularFirestore,
    private store: Store<fromApp.AppState>,
    private deleteSvc: DataDeleteService
  ) {
    super(route);

    this.categoriesCollection = this.fireStore.collection<ProductCategory>('product-categories');
    this.productsCollection = this.fireStore.collection<Product>('products');
  }

  initForm = () => {
    let name = '',
      categoryId = '',
      price = null,
      stock = null,
      specifics = '',
      description = '',
      imgUrl = '';

    this.form = new FormGroup({
      name: new FormControl(name, [Validators.required]),
      categoryId: new FormControl(categoryId, [Validators.required]),
      price: new FormControl(price, [Validators.required, Validators.min(0.01)]),
      stock: new FormControl(stock, [Validators.required, Validators.min(0)]),
      specifics: new FormControl(specifics),
      description: new FormControl(description),
      imgUrl: new FormControl(imgUrl, [Validators.required])
    })
    
    this.categoriesCollection.get().pipe(
      take(1)
    ).subscribe(categories => {
      const docs = categories.docs;
      const categoriesOptions = {};

      docs.forEach(doc => {
        const docData = <ProductCategory>doc.data()
        categoriesOptions[doc.id] = docData.name;
      })

      this.categoriesOptions = categoriesOptions;
    })

    if(this.id){
      this.productsCollection
        .doc(this.id)
        .get()
        .pipe(
          take(1)
        ).subscribe(product => {
          const productData = <Product>product.data();

          if(productData){
            this.form = new FormGroup({
              name: new FormControl(productData.name, [Validators.required]),
              categoryId: new FormControl(productData.categoryId, [Validators.required]),
              price: new FormControl(productData.price, [Validators.required, Validators.min(0.01)]),
              stock: new FormControl(productData.stock, [Validators.required, Validators.min(0)]),
              specifics: new FormControl(productData.specifics),
              description: new FormControl(productData.description),
              imgUrl: new FormControl(productData.imgUrl, [Validators.required])
            })
          } else {
            this.store.dispatch(
              new AppMsgActions.AppError(`Product with id "${this.id}" was not found.`)
            )

            this.router.navigate(['/admin/products']);
          }
        })
    }
  }

  onSubmit = () => {
    const name = this.form.get('name').value,
      categoryId = this.form.get('categoryId').value,
      price = this.form.get('price').value,
      stock = this.form.get('stock').value,
      specifics = this.form.get('specifics').value,
      description = this.form.get('description').value,
      imgUrl = this.form.get('imgUrl').value;

    if(!name || !categoryId || !price || !stock || !imgUrl){
      this.store.dispatch(
        new AppMsgActions.AppError('Please fill out the fields and provide an image.')
      )

      return;
    }

    if(this.editMode){

      this.productsCollection
        .doc<Product>(this.id)
        .update({
          name,
          description,
          imgUrl,
          categoryId,
          price,
          specifics,
          stock
        })
        .then(() => {
          this.store.dispatch(
            new AppMsgActions.AppInfo('Product successfully updated.')
          )
        })
        .catch(error => {
          console.log(error);

          this.store.dispatch(
            new AppMsgActions.AppError('An error occurred while updating the product.')
          )
        })
        
    } else {

      this.productsCollection.get()
        .pipe(
          take(1)
        ).subscribe(products => {
          const allProducts = products.docs;
          const newProductId = (allProducts.length + 1).toString();

          this.productsCollection
            .doc<Product>(newProductId)
            .set({
              name,
              description,
              imgUrl,
              categoryId,
              price,
              specifics,
              stock
            })
            .then(() => {
              this.store.dispatch(
                new AppMsgActions.AppInfo('Product successfully added.')
              )

              this.router.navigate([`/admin/products/edit/${newProductId}`])
            })
            .catch(error => {
              console.log(error);

              this.store.dispatch(
                new AppMsgActions.AppError('An error occurred while adding the product.')
              )
            })
        })

    }
  }

  onOpenAccept = () => {
    this.acceptPopupOpen = true;
  }

  onCloseAccept = () => {
    this.acceptPopupOpen = false;
  }

  onDelete = () => {
    this.deleteSvc.deleteProduct(this.id, '/admin/products')
    this.acceptPopupOpen = false;
  }
}