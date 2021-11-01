import { NG_VALUE_ACCESSOR } from '@angular/forms'
import { InputComponent } from '@app/shared/components/utility/input-component.class'
import { Component, forwardRef, Input } from '@angular/core';

export const CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => NumericFieldComponent),
  multi: true
};

@Component({
  selector: 'app-numeric-field',
  templateUrl: './numeric-field.component.html',
  styleUrls: ['./numeric-field.component.scss'],
  providers: [CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR]
})
export class NumericFieldComponent extends InputComponent {
  @Input() withDecimals: boolean = false;

  constructor() {
    super();
  }

  override onChange(e:Event, value:any){
    this.innerValue = value;

    const propagatedValue = this.withDecimals ? parseFloat(parseFloat(this.innerValue).toFixed(2)) : +this.innerValue;
    this.propagateChange(propagatedValue);
  }

}
