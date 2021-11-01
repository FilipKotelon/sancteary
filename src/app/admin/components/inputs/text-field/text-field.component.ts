import { NG_VALUE_ACCESSOR } from '@angular/forms'
import { Component, Input, forwardRef } from '@angular/core';
import { InputComponent } from '@app/shared/components/utility/input-component.class';

export const CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => TextFieldComponent),
  multi: true
};

@Component({
  selector: 'app-text-field',
  templateUrl: './text-field.component.html',
  styleUrls: ['./text-field.component.scss'],
  providers: [CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR]
})
export class TextFieldComponent extends InputComponent {
  @Input() isLarge = false;

  constructor() {
    super()
  }

}
