import { Component, OnInit } from '@angular/core';
import { NgClass, NgIf } from '@angular/common';
import { Router, ActivatedRoute, RouterLink } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { first } from 'rxjs/operators';

import { AccountService, AlertService } from '@app/_services';
import { SignupRequestPayload } from '@app/_models';

@Component({
    templateUrl: 'register.component.html', styleUrls: ['register.component.css'],
    standalone: true,
    imports: [ReactiveFormsModule, NgClass, NgIf, RouterLink]
})
export class RegisterComponent implements OnInit {
    signupForm!: FormGroup;
    signupRequestPayload!: SignupRequestPayload;
    loading = false;
    submitted = false;

    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private accountService: AccountService,
        private alertService: AlertService
    ) {
        this.signupRequestPayload = {
            username: '',
            email: '',
            password: ''
          };
          
        // redirect to home if already logged in
        // if (this.accountService.userValue) {
        //     this.router.navigate(['/']);
        // }
    }

    ngOnInit() {
        this.signupForm = this.formBuilder.group({
            username: ['', Validators.required],
            email: ['', Validators.required],            
            password: ['', [Validators.required, Validators.minLength(6)]]
        });
    }

    // convenience getter for easy access to form fields
    get f() { return this.signupForm.controls; }

    onSubmit() {
        this.submitted = true;

        // reset alert on submit
        this.alertService.clear();

        // stop here if form is invalid
        if (this.signupForm.invalid) {
            return;
        }

        this.loading = true;
        this.accountService.register(this.signupForm.value)
            .pipe(first())
            .subscribe({
                next: () => {
                    this.alertService.success('Registration successful', true);
                    this.router.navigate(['/account/login'], { queryParams: { registered: true }});
                },
                error: error => {
                    this.alertService.error(error);
                    this.loading = false;
                }
            });
    }
}