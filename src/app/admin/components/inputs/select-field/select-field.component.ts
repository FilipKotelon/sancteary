import { InputComponent } from '@app/shared/components/utility/input-component.class'
import { NG_VALUE_ACCESSOR } from '@angular/forms'
import { Component, forwardRef, Input } from '@angular/core';

export const CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => SelectFieldComponent),
  multi: true
};

@Component({
  selector: 'app-select-field',
  templateUrl: './select-field.component.html',
  styleUrls: ['./select-field.component.scss'],
  providers: [CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR]
})
export class SelectFieldComponent extends InputComponent {
  @Input() options: Object;

  isOpen = false;

  constructor() {
    super();
  }

  public override get value(): any {
    if(!this.innerValue){
      this.innerValue = Object.keys(this.options)[0];
    }
    return this.innerValue;
  }

  override set value(v: any) {
    if (v !== this.innerValue) {
      this.innerValue = v;
    }
  }

  selectValue = (e: Event, key) => {
    this.value = key;
    this.isOpen = false;

    this.onChange(e, key);
  }
  
  openSelect = () => {
    this.isOpen = true;
  }
}
