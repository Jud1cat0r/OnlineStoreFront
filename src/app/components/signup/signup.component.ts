import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import ValidateForm from 'src/app/helpers/validateform';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  signUpForm!: FormGroup;
  constructor(private fb: FormBuilder,
    private auth: AuthService,
    private router: Router,
    private toast: NgToastService
  ) { }

  ngOnInit(): void {
    this.signUpForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      firstname: ['', Validators.required],
      email: ['', Validators.required]
    })
  }

  onSignup() {
    if (this.signUpForm.valid) {
      this.auth.signUp(this.signUpForm.value)
        .subscribe({
          next: (res => {
            this.toast.success({ detail: "SUCCESS", summary: res.message, duration: 5000 });
            this.signUpForm.reset();
            this.router.navigate(['login']);
          }),
          error: (err => {
            this.toast.error({ detail: "ERROR", summary: err.message, duration: 5000 });
          })
        })
    } else {
      ValidateForm.validateAllFormFields(this.signUpForm);
      alert("Error");
    }
  }
}
