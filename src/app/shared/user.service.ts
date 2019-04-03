import { Injectable } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private fb: FormBuilder) { }

  formModel = this.fb.group({
    UserName: ['', Validators.required],
    Email: ['', Validators.email],
    FullName: [''],
    Passwords: this.fb.group({
      Password: ['', [Validators.required, Validators.minLength(4)]],
      ConfirmPassword: ['', Validators.required]
    },{validator: this.comparePasswords})
  });

  comparePasswords(fb: FormGroup){
    let confirmPasswordCtrl = fb.get('ConfirmPassword');

    if(confirmPasswordCtrl.errors == null || 'passwordMismatch' in confirmPasswordCtrl.errors){
      if(fb.get('Password').value != confirmPasswordCtrl){
        confirmPasswordCtrl.setErrors({passwordMismatch: true})
      }else{
        confirmPasswordCtrl.setErrors(null);
      }
    }
  }
}
