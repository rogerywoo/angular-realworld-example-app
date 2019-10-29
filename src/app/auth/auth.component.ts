import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Errors, UserService } from '../shared';

@Component({
    selector: 'app-auth',
    templateUrl: './auth.component.html',
    styleUrls: ['./auth.component.css']
})

export class AuthComponent implements OnInit {
    authType: String = '';
    title: String = '';
    isSubmitting: boolean = false;
    authForm: FormGroup;
    errors: Errors = new Errors();

    constructor(
        private route: ActivatedRoute,
        private fb: FormBuilder,
        private userService: UserService,
        private router: Router) { 
        this.authForm = this.fb.group({
            'email': [' ', Validators.required ],
            'password': [' ', Validators.required ]
        });
    }

    ngOnInit() {
        this.route.url.subscribe(data => {
            // Get the last piece of the URL (it's either 'login' or 'register')
            this.authType = data[data.length - 1].path;
            // Set a title for the page accordingly
            this.title = (this.authType === 'login') ? 'Sign In' : 'Sign Up';
            // add form control for username if this is the register page
            if (this.authType === 'register') {
                this.authForm.addControl('username', new FormControl('', Validators.required));
            }
        });    
    }

    submitForm() {
        this.isSubmitting = true;
        this.errors = new Errors();

        let credentials = this.authForm.value;
        // check out what you get!
        console.log(credentials);
        this.userService.attemptAuth(this.authType, credentials)
            .subscribe(
                data => this.router.navigateByUrl('/'),
                err => {
                    this.errors = err;
                    this.isSubmitting = false;
                }
            );
    }
}
