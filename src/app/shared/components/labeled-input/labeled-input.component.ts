import { Component, Input, OnInit, forwardRef, OnChanges, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR } from '@angular/forms';

export const CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => LabeledInputComponent),
  multi: true
};

@Component({
  selector: 'app-labeled-input',
  templateUrl: './labeled-input.component.html',
  styleUrls: ['./labeled-input.component.scss'],
  providers: [CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR]
})
export class LabeledInputComponent implements ControlValueAccessor, OnChanges, AfterViewInit {
  @Input() label: string;
  @Input() validationMessage: string;
  @Input() type = 'text';
  @Input() control:FormControl = new FormControl(); 

  @ViewChild('input') inputRef:ElementRef; 

  innerValue = '';
  labelUp = false;

  constructor() { }

  ngOnChanges(){ }

  ngAfterViewInit(){ 
    // RESET the custom input form control UI when the form control is RESET
    this.control.valueChanges.subscribe(
      () => {
        // check condition if the form control is RESET
        if (this.control.value == '' || this.control.value == null || this.control.value == undefined) {
          this.innerValue = '';      
          this.inputRef.nativeElement.value = '';                 
        }
      }
    );
  }

  onFocus = () => {
    this.labelUp = true;
  }

  onFocusOut = () => {
    if(!this.value){
      this.labelUp = false;
    }
  }

  //get accessor
  get value(): any {
    return this.innerValue;
  };

  //set accessor including call the onchange callback
  set value(v: any) {
    if (v !== this.innerValue) {
      this.innerValue = v;
    }
  }

  // event fired when input value is changed . later propagated up to the form control using the custom value accessor interface
  onChange(e:Event, value:any){
    //set changed value
    this.innerValue = value;
    // propagate value into form control using control value accessor interface
    this.propagateChange(this.innerValue);
  }

  //propagate changes into the custom form control
  propagateChange = (_: any) => { }

  //From ControlValueAccessor interface
  writeValue(value: any) {
    this.innerValue = value;

    if(this.value){
      this.onFocus();
    }
  }

  //From ControlValueAccessor interface
  registerOnChange(fn: any) {
    this.propagateChange = fn;
  }

  //From ControlValueAccessor interface
  registerOnTouched(fn: any) {

  }

}
