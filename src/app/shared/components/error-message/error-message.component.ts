import { Subscription } from 'rxjs'
import { Store } from '@ngrx/store'
import { Component, OnInit, OnDestroy } from '@angular/core'

import * as fromApp from '@app/store/app.reducer'
import * as AppErrorActions from '@app/store/app-error.actions'
import * as AppErrorSelectors from '@app/store/app-error.selectors'

@Component({
  selector: 'app-error-message',
  templateUrl: './error-message.component.html',
  styleUrls: ['./error-message.component.scss']
})
export class ErrorMessageComponent implements OnInit, OnDestroy {
  private storeSub: Subscription;
  errorMsg = '';
  isOpen = false;

  constructor(private store: Store<fromApp.AppState>) { }

  ngOnInit(): void {
    this.storeSub = this.store.select(AppErrorSelectors.selectError).subscribe(errorMsg => {
      if(errorMsg){
        this.isOpen = true;
      } else {
        this.isOpen = false;
      }

      this.errorMsg = errorMsg;
    })
  }

  ngOnDestroy() {
    this.storeSub.unsubscribe();
  }

  closeErrorMsg = () => {
    this.store.dispatch(
      new AppErrorActions.AppErrorClear()
    )
  }
}
