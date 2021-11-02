import { DataDeleteService } from './../../../services/data-delete.service'
import { Store } from '@ngrx/store'
import { map, take } from 'rxjs/operators'
import { FormGroup, FormControl, Validators } from '@angular/forms'
import { Component, OnDestroy } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { EditableOrNew } from '@app/admin/utility/editable-or-new.class'
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore'
import { ProductCategory } from '@app/shared/models/product-category.model'

import * as AppMsgActions from '@app/store/app-msg.actions'
import * as fromApp from '@app/store/app.reducer'

@Component({
  selector: 'app-categories-edit',
  templateUrl: './categories-edit.component.html',
  styleUrls: ['./categories-edit.component.scss']
})
export class CategoriesEditComponent extends EditableOrNew {
  form: FormGroup;
  categoriesCollection: AngularFirestoreCollection;
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
  }

  initForm = () => {
    let name = '',
      imgUrl = '';

    this.form = new FormGroup({
      name: new FormControl(name, [Validators.required]),
      imgUrl: new FormControl(imgUrl, [Validators.required])
    })

    if(this.id){
      this.categoriesCollection.doc(this.id).get().pipe(
        take(1)
      ).subscribe(category => {
        const categoryData = <ProductCategory>category.data();

        if(categoryData){
          this.form = new FormGroup({
            name: new FormControl(categoryData.name, [Validators.required]),
            imgUrl: new FormControl(categoryData.imgUrl, [Validators.required])
          })
        } else {
          this.store.dispatch(
            new AppMsgActions.AppError(`Category with id "${this.id}" was not found.`)
          )

          this.router.navigate(['/admin/categories'])
        }
      })
    }
  }

  onSubmit = () => {
    const name = this.form.get('name').value;
    const imgUrl = this.form.get('imgUrl').value;

    if(!name || !imgUrl){
      this.store.dispatch(
        new AppMsgActions.AppError('Please provide an image and a name for the category.')
      )

      return;
    }

    if(this.editMode){

      this.categoriesCollection
        .doc<ProductCategory>(this.id)
        .update({
          name,
          imgUrl
        })
        .then(() => {
          this.store.dispatch(
            new AppMsgActions.AppInfo('Category successfully updated.')
          )
        })
        .catch(error => {
          console.log(error);

          this.store.dispatch(
            new AppMsgActions.AppError('An error occurred while updating the category.')
          )
        })

    } else {
      this.categoriesCollection.get().pipe(
        take(1)
      ).subscribe(categories => {
        const allCategories = categories.docs;
        const newCategoryId = (allCategories.length + 1).toString();

        this.categoriesCollection
          .doc<ProductCategory>(newCategoryId)
          .set({
            name,
            imgUrl
          })
          .then(() => {
            this.store.dispatch(
              new AppMsgActions.AppInfo('Category successfully added.')
            )

            this.router.navigate([`/admin/categories/edit/${newCategoryId}`])
          })
          .catch(error => {
            console.log(error);

            this.store.dispatch(
              new AppMsgActions.AppError('An error occurred while adding the category.')
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
    this.deleteSvc.deleteCategory(this.id, '/admin/categories')
    this.acceptPopupOpen = false;
  }
}