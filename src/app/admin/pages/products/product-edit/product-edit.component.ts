import { FormGroup, FormControl, Validators } from '@angular/forms'
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EditableOrNew } from '@app/admin/utility/editable-or-new.class';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.scss']
})
export class ProductEditComponent extends EditableOrNew {
  form: FormGroup;

  constructor(protected route: ActivatedRoute) {
    super(route);
  }

  initForm = () => {
    let name = '',
      category = '',
      price = null,
      stock = null,
      specifics = '',
      desc = '',
      imgUrl = '';

    if(this.id){

    }

    this.form = new FormGroup({
      name: new FormControl(name, [Validators.required]),
      category: new FormControl(category, [Validators.required]),
      price: new FormControl(price, [Validators.required, Validators.min(0.01)]),
      stock: new FormControl(stock, [Validators.required, Validators.min(0)]),
      specifics: new FormControl(specifics),
      desc: new FormControl(desc),
      imgUrl: new FormControl(imgUrl, [Validators.required])
    })
  }

  onSubmit = () => {
    
  }
}