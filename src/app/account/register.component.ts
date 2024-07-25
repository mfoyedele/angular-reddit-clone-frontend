import { Component, OnInit } from '@angular/core';
import { NgClass, NgIf } from '@angular/common';
import { Router, ActivatedRoute, RouterLink } from '@angular/router';
import { FormBuilder, FormGroup, FormControl, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { first } from 'rxjs/operators';

import { AccountService, AlertService } from '@app/_services';
import { SignupRequestPayload } from '@app/_models';

@Component({
    templateUrl: 'register.component.html', styleUrls: ['register.component.css'],
    standalone: true,
    imports: [ReactiveFormsModule, NgClass, NgIf, RouterLink, FormsModule]
})
export class RegisterComponent implements OnInit {
    signupRequestPayload: SignupRequestPayload;
    signupForm!: FormGroup;
    loading = false;
    submitted = false;

    constructor(
       
        private router: Router,
        private accountService: AccountService,
        private alertService: AlertService
    ) {
        this.signupRequestPayload = {
            username: '',
            email: '',
            password: ''
          };
          
    }

    ngOnInit() {
        this.signupForm = new FormGroup({
            username: new FormControl('', Validators.required),
            email: new FormControl('', [Validators.required, Validators.email]),
            password: new FormControl('', [Validators.required, Validators.minLength(6)]),
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
                    this.alertService.error("Register failed!");
                    this.loading = false;
                }
            });
    }
}