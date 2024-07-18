import { Component, OnInit } from '@angular/core';
import { NgClass, NgIf } from '@angular/common';
import { Router, ActivatedRoute, RouterLink } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { first } from 'rxjs/operators';

import { AccountService, AlertService } from '@app/_services'
import { LoginRequestPayload } from '@app/_models';

@Component({
    templateUrl: 'login.component.html', styleUrls: ['login.component.css'],
    standalone: true,
    imports: [ReactiveFormsModule, NgClass, NgIf, RouterLink]
})
export class LoginComponent implements OnInit {
    form!: FormGroup;
    loginRequestPayload!: LoginRequestPayload;
    loading = false;
    registerSuccessMessage!: string;
    submitted = false;
    isError!: boolean;

    constructor(
        private formBuilder: FormBuilder,        
        private route: ActivatedRoute,
        private router: Router,
        private accountService: AccountService,
        private alertService: AlertService,
    ) {
        // redirect to home if already logged in
        if (this.accountService.userValue) {
            this.router.navigate(['/']);
        }
    }

    ngOnInit() {
        this.form = this.formBuilder.group({
            username: ['', Validators.required],
            password: ['', Validators.required]
        });
        this.route.queryParams
        .subscribe(params => {
          if (params.registered !== undefined && params.registered === 'true') {
            // this.toastr.success('Signup Successful');
            this.registerSuccessMessage = 'Please Check your inbox for activation email '
              + 'activate your account before you Login!';
          }
        });
    }

    // convenience getter for easy access to form fields
    get f() { return this.form.controls; }

    onSubmit() {
        this.submitted = true;

        // reset alerts on submit
        this.alertService.clear();

        // stop here if form is invalid
        if (this.form.invalid) {
            return;
        }

        this.loading = true;
        this.accountService.login(this.loginRequestPayload)
            .pipe(first())
            .subscribe({
                next: () => {
                    // get return url from query parameters or default to home page
                    const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
                    this.router.navigateByUrl(returnUrl);
                    // this.toastr.success('Login Successful');
                },
                error: error => {
                    this.alertService.error(error);
                    this.loading = false;
                    this.isError = true;
                }
            });
    }
}