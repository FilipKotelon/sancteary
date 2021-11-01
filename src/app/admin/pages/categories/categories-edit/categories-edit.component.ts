import { FormGroup, FormControl, Validators } from '@angular/forms'
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EditableOrNew } from '@app/admin/utility/editable-or-new.class';

@Component({
  selector: 'app-categories-edit',
  templateUrl: './categories-edit.component.html',
  styleUrls: ['./categories-edit.component.scss']
})
export class CategoriesEditComponent extends EditableOrNew {
  form: FormGroup;

  constructor(protected route: ActivatedRoute) {
    super(route);
  }

  initForm = () => {
    let name = '',
      imgUrl = '';

    if(this.id){

    }

    this.form = new FormGroup({
      name: new FormControl(name, [Validators.required]),
      imgUrl: new FormControl(imgUrl, [Validators.required])
    })
  }
}