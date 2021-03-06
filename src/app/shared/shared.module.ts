import { RouterModule } from '@angular/router'
import { NavFrameComponent } from '@shared/components/nav-frame/nav-frame.component'
import { ReactiveFormsModule } from '@angular/forms'
import { CustomCursorComponent } from './components/custom-cursor/custom-cursor.component'
import { HoverEnlargeCursorDirective } from './directives/hover-enlarge-cursor.directive'
import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core';
import { LabeledInputComponent } from './components/labeled-input/labeled-input.component';
import { PopupMessageComponent } from './components/popup-message/popup-message.component';
import { ErrorMessageComponent } from './components/error-message/error-message.component';
import { InfoMessageComponent } from './components/info-message/info-message.component';
import { AcceptPopupComponent } from './components/accept-popup/accept-popup.component';



@NgModule({
  declarations: [
    HoverEnlargeCursorDirective,
    CustomCursorComponent,
    LabeledInputComponent,
    NavFrameComponent,
    PopupMessageComponent,
    ErrorMessageComponent,
    InfoMessageComponent,
    AcceptPopupComponent
  ],
  imports: [
    RouterModule,
    CommonModule,
    ReactiveFormsModule,
  ],
  exports: [
    HoverEnlargeCursorDirective,
    CustomCursorComponent,
    CommonModule,
    ReactiveFormsModule,
    LabeledInputComponent,
    NavFrameComponent,
    PopupMessageComponent,
    ErrorMessageComponent,
    InfoMessageComponent,
    AcceptPopupComponent
  ]
})
export class SharedModule { }
