import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EditableOrNew } from '@app/admin/utility/editable.class';

@Component({
  selector: 'app-categories-edit',
  templateUrl: './categories-edit.component.html',
  styleUrls: ['./categories-edit.component.scss']
})
export class CategoriesEditComponent extends EditableOrNew {

  constructor(protected route: ActivatedRoute) {
    super(route);
  }

  initForm = () => {
    console.log(this.editMode);
  }
}