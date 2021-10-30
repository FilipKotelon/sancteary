import { Subscription } from 'rxjs'
import { Store } from '@ngrx/store'
import { Directive, OnInit } from '@angular/core'

import * as fromApp from '@app/store/app.reducer'
import * as fromAppMsgSelectors from '@app/store/app-msg.selectors'
import * as AppMsgActions from '@app/store/app-msg.actions'

@Directive()
export abstract class PopupController implements OnInit {
  private storeSub: Subscription;
  msg = '';
  isOpen = false;
  
  constructor(protected store: Store<fromApp.AppState>, protected msgSelector: fromAppMsgSelectors.SelectorType, protected clearMsgAction: AppMsgActions.AppMsgClearActions) {}

  ngOnInit(): void {
    this.storeSub = this.store.select(this.msgSelector).subscribe(msg => {
      if(msg){
        this.isOpen = true;
      } else {
        this.isOpen = false;
      }

      this.msg = msg;
    })
  }

  ngOnDestroy() {
    this.storeSub.unsubscribe();
  }

  closePopup = () => {
    this.store.dispatch(
      new this.clearMsgAction()
    )
  }
}