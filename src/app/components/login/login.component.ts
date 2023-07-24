import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validator, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import ValidateForm from 'src/app/helpers/validateform';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm!: FormGroup;
  constructor(private fb: FormBuilder,
    private auth: AuthService,
    private router: Router,
    private toast: NgToastService
  ) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    })
  }

  onLogin() {
    if (this.loginForm.valid) {
      this.auth.login(this.loginForm.value)
        .subscribe({
          next: (res) => {
            this.toast.success({ detail: "SUCCESS", summary: res.message, duration: 5000 });
            this.loginForm.reset();
            this.router.navigate(['dashboard']);
          },
          error: (err) => {
            this.toast.error({ detail: "ERROR", summary: err.message, duration: 5000 });
          }
        })

    } else {
      ValidateForm.validateAllFormFields(this.loginForm);
      alert("Error");
    }
  }





}

