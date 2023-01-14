import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl,
  AbstractControl,
  ValidationErrors,
  ValidatorFn,
} from '@angular/forms';
import { Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { UserCredential } from '@firebase/auth-types';
import { AuthService } from 'src/app/core/services/auth/auth.service';

export function matchValidator(
  matchTo: string,
  reverse?: boolean
): ValidatorFn {
  return (control: AbstractControl):
  ValidationErrors | null => {
    if (control.parent && reverse) {
      const c = (control.parent?.controls as any)[matchTo] as AbstractControl;
      if (c) {
        c.updateValueAndValidity();
      }
      return null;
    }
    return !!control.parent &&
      !!control.parent.value &&
      control.value ===
      (control.parent?.controls as any)[matchTo].value
      ? null
      : { matching: true };
  };
}
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  passwordsMatching = false;
  isConfirmPasswordDirty = false;
  confirmPasswordClass = 'form-control';
  hide = true;
  hideRepass = true;

  formGroup!: FormGroup;

  constructor(
    private router: Router,
    private _authService: AuthService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.formGroup = this.formBuilder.group({
      email: [null, [Validators.required, Validators.email]],
      password: [
        null,
        [
          Validators.required,
          Validators.pattern(
            '(?=[A-Za-z0-9@#$%^&+!=]+$)^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[@#$%^&+!=])(?=.{8,}).*$'
          ),
        ],
      ],
      name: [null, Validators.required],
      REpassword:[null, [Validators.required,matchValidator('password')]]
    });
  }
  onSignupClicked() {
    if (this.formGroup.invalid) {
      this.validateFormGroup();
    } else {
      this.signup();
    }
  }

  signup() {
    this._authService
      .signup(this.email.value, this.password.value)
      .pipe(
        switchMap((user: any) => {
          return this._authService.createUser(
            user.user.uid,
            this.name.value,
            this.email.value
          );
        })
      )
      .subscribe(() => {});
  }
  validateFormGroup() {
    Object.keys(this.formGroup.controls).forEach((filed) => {
      const control = this.formGroup.get(filed);
      control?.markAsTouched({ onlySelf: true });
    });
  }

  getEmailErrorMessage() {
    if (this.email.hasError('required')) {
      return 'You must enter a value';
    }
    return this.email.hasError('email') ? 'Not a valid email' : '';
  }

  getPasswordErrorMessage() {
    if (this.password.hasError('required')) {
      return 'You must enter a value';
    }
    return 'Password not valid'; //The password must be at least 8 characters long. It must be a mixture of numbers, symbols, and uppercase and lowercase letters.
  }
  getRE_PasswordErrorMessage() {
    if (this.REpassword.hasError('matching')) {
      return 'Passwords not match';
    }
    return 'correct'; //The password must be at least 8 characters long. It must be a mixture of numbers, symbols, and uppercase and lowercase letters.
  }
  get name() {
    return this.formGroup.controls['name'] as FormControl;
  }
  get email() {
    return this.formGroup.controls['email'] as FormControl;
  }
  get password() {
    return this.formGroup.controls['password'] as FormControl;
  }
  get REpassword() {
    return this.formGroup.controls['REpassword'] as FormControl;
  }
}
