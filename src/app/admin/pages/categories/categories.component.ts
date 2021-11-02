import { Subscription } from 'rxjs'
import { DataDeleteService } from './../../services/data-delete.service'
import { DbProductCategory, ProductCategory } from '@shared/models/product-category.model'
import { Component, OnInit, OnDestroy } from '@angular/core'
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore'

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit, OnDestroy {
  categories: DbProductCategory[] = [];
  categoriesCollection: AngularFirestoreCollection;
  idToDelete: string;
  categoriesSub: Subscription;
  acceptPopupOpen = false;

  constructor(private fireStore: AngularFirestore, private deleteSvc: DataDeleteService) {
    this.categoriesCollection = this.fireStore.collection<DbProductCategory>('product-categories');
  }

  ngOnInit() {
    this.categoriesSub = this.categoriesCollection.snapshotChanges().subscribe(categories => {
      this.categories = categories.map(doc => {
        const docData = <ProductCategory>doc.payload.doc.data();

        return new DbProductCategory(doc.payload.doc.id, docData.name, docData.imgUrl)
      })
    })
  }

  onOpenAccept = (id: string) => {
    this.acceptPopupOpen = true;
    this.idToDelete = id;
  }

  onCloseAccept = () => {
    this.acceptPopupOpen = false;
    this.idToDelete = '';
  }

  onDelete = () => {
    if(this.idToDelete){
      this.deleteSvc.deleteCategory(this.idToDelete, '/admin/categories')
    }

    this.idToDelete = '';
    this.acceptPopupOpen = false;
  }

  ngOnDestroy() {
    this.categoriesSub.unsubscribe();
  }
}
