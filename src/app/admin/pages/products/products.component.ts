import { Product } from './../../../shared/models/product.model'
import { Subscription } from 'rxjs'
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/compat/firestore'
import { Component, OnInit, OnDestroy } from '@angular/core';
import { DbProduct } from '@shared/models/product.model';
import { DataDeleteService } from '@admin/services/data-delete.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit, OnDestroy {
  products: DbProduct[] = [];
  productsCollection: AngularFirestoreCollection;
  idToDelete: string;
  productsSub: Subscription;
  acceptPopupOpen = false;

  constructor(private fireStore: AngularFirestore, private deleteSvc: DataDeleteService) {
    this.productsCollection = this.fireStore.collection<DbProduct>('products');
  }

  ngOnInit() {
    this.productsSub = this.productsCollection.snapshotChanges().subscribe(products => {
      this.products = products.map(doc => {
        const docData = <Product>doc.payload.doc.data();

        return new DbProduct(
          doc.payload.doc.id,
          docData.name,
          docData.description,
          docData.imgUrl,
          docData.categoryId,
          docData.price,
          docData.specifics,
          docData.stock
        )
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
      this.deleteSvc.deleteProduct(this.idToDelete, '/admin/products')
    }

    this.idToDelete = '';
    this.acceptPopupOpen = false;
  }

  ngOnDestroy() {
    this.productsSub.unsubscribe();
  }
}
