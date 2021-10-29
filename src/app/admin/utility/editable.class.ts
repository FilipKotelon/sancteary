import { OnInit, Directive } from '@angular/core'
import { ActivatedRoute, Params } from "@angular/router";

@Directive()
export abstract class EditableOrNew implements OnInit {
  protected id: number;
  protected editMode = false;

  constructor(protected route: ActivatedRoute) {}

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.id = +params['id'];
      this.editMode = params['id'] != null;
      this.initForm();
    });
  }

  protected abstract initForm()
}