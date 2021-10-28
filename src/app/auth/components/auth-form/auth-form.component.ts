import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';

export enum AuthType {
  LogIn,
  SignUp
}

export interface AuthFormHandler{
  onSubmit(f: FormGroup): void;
  onError(f: FormGroup): void;
}

@Component({
  selector: 'app-auth-form',
  templateUrl: './auth-form.component.html',
  styleUrls: ['./auth-form.component.scss']
})
export class AuthFormComponent implements OnInit {
  @Output() submitted = new EventEmitter<FormGroup>();
  @Output() errorOccured = new EventEmitter<FormGroup>();

  @Input() authType: AuthType;

  allAuthTypes = AuthType;

  contactForm: FormGroup;
  // passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/;
  passwordRegex = /^.{6,}$/;

  constructor() { }

  ngOnInit(): void {
    this.contactForm = new FormGroup({
      'email': new FormControl(null, [Validators.required, Validators.email]),
      'password': new FormControl(null, [Validators.required, this.validatePassword]),
    })
  }

  onSubmit = () => {
    if(this.contactForm.valid){
      this.submitted.emit(this.contactForm);
    } else {
      this.errorOccured.emit(this.contactForm);
    }
  }

  validatePassword = (control: FormControl): ValidationErrors => {
    if(!this.passwordRegex.test(control.value)){
      return {'passwordIncorrect': true}
    }
    return null;
  }
}
