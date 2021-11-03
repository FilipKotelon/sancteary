import { DataDeleteService } from './../../services/data-delete.service'
import { Store } from '@ngrx/store'
import { of } from 'rxjs'
import { NG_VALUE_ACCESSOR } from '@angular/forms'
import { fadeInOut } from './../../../shared/animations/component-animations'
import { InputComponent } from '@app/shared/components/utility/input-component.class'
import { Component, Input, forwardRef, OnDestroy } from '@angular/core'
import { AngularFireStorage } from '@angular/fire/compat/storage'
import { Subscription } from 'rxjs'
import { finalize, catchError } from 'rxjs/operators'

import * as AppMsgActions from '@app/store/app-msg.actions'
import * as fromApp from '@app/store/app.reducer'

export const CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => FileUploadComponent),
  multi: true
};

@Component({
  selector: 'app-file-upload[path]',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss'],
  providers: [CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR],
  animations: [
    fadeInOut
  ]
})
export class FileUploadComponent extends InputComponent implements OnDestroy {
  @Input() imgUrl: string;
  @Input() path: string;

  uploading = false;
  uploadPercentage = 0;
  
  uploadPercentageSub: Subscription;
  uploadSub: Subscription;

  constructor(
    private fireStorage: AngularFireStorage,
    private store: Store<fromApp.AppState>,
    private deleteSvc: DataDeleteService
  ) {
    super();
  }

  uploadImg = (e: Event) => {
    this.clearSubs()

    const input = (<HTMLInputElement>e.target);
    const imgFile = input.files[0];

    if(!imgFile){
      return;
    }
  
    const imgToDelete = this.imgUrl;

    this.uploading = true;

    const imgPath = `${this.path}/${this.getImgFileName(input.value)}`;
    const imgFileRef = this.fireStorage.ref(imgPath);
    const task = imgFileRef.put(imgFile);

    this.uploadPercentageSub = task.percentageChanges().subscribe(percentage => {
      this.uploadPercentage = percentage;
    })

    this.uploadSub = task.snapshotChanges().pipe(
      finalize(() => {
        imgFileRef.getDownloadURL().subscribe(url => {
          this.imgUrl = url;
          this.onChange(e, url);
          this.uploading = false;

          //After successful upload, delete the previous image
          if(imgToDelete){
            this.deleteSvc.deleteImage(imgToDelete);
          }
        })
      }),
      catchError(error => {
        console.log(error);

        return of(
          this.store.dispatch(new AppMsgActions.AppError('Upload failed.'))
        )
      })
    ).subscribe()
  }

  clearSubs = () => {
    if(this.uploadPercentageSub){
      this.uploadPercentageSub.unsubscribe();
    }
    if(this.uploadSub){
      this.uploadSub.unsubscribe();
    }
  }

  getImgFileName = (filePath: string) => {
    return this.getRandomFileId() + '_' + filePath.split(/(\\|\/)/g).pop();
  }

  getRandomFileId = () => Math.random().toString(36).substr(2, 9);

  ngOnDestroy() {
    this.clearSubs();
  }

}
