import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EditableOrNew } from '@app/admin/utility/editable.class';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.scss']
})
export class ProductEditComponent extends EditableOrNew {

  constructor(protected route: ActivatedRoute) {
    super(route);
  }

  initForm = () => {
    console.log(this.editMode);
  }
}