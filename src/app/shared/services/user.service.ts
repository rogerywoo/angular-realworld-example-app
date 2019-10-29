import { Injectable } from '@angular/core';
//import { Http } from '@angular/http';
import { HttpClient} from '@angular/common/http'; 
import { Observable } from 'rxjs/Rx';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/take';

import { ApiService } from './api.service';
import { User } from '../models';
import { JwtService } from './jwt.service'


@Injectable()
export class UserService {
    private currentUserSubject = new BehaviorSubject<User>(new User());
    public currentUser = this.currentUserSubject.asObservable().distinctUntilChanged();

    private isAuthenticatedSubject = new ReplaySubject<boolean>(1);
    public isAuthenticated = this.isAuthenticatedSubject.asObservable();

    constructor (
        private apiService: ApiService,
        private httpClient: HttpClient,
        private jwtService: JwtService
    ) {}

    populate() {
    // If JWT detected, attempt to get & store user's info

        if (this.jwtService.getToken()) {
            // utilize our newly created get() method (params are optional)
            this.apiService.get('/user')
            .subscribe(
                data => this.setAuth(data.user),
                err => this.purgeAuth()
            );
        } else {
        // Remove any potential remnants of previous auth states

            this.purgeAuth();
        }
    }

    
    purgeAuth() {
        // Remove JWT from localstorage
        this.jwtService.destroyToken();
        // Set current user to an empty object
        this.currentUserSubject.next(new User());
        // Set auth status to false
        this.isAuthenticatedSubject.next(false);
    }

    setAuth(user: User) {
        // Save JWT sent from server in localstorage
        this.jwtService.saveToken(user.token);        
        // Set current user data into observable
        this.currentUserSubject.next(user);
        // Set isAuthenticated to true
        this.isAuthenticatedSubject.next(true);
    }

    attemptAuth(type, credentials): Observable<User> {
        let route = (type === 'login') ? '/login' : '';
        return this.apiService.post('/users' + route, {user: credentials})
            .map(
                data => {
                this.setAuth(data.user);
                return data;
            }
        );
    }

    getCurrentUser(): User {
        return this.currentUserSubject.value;
    }

    // Update the user on the server (email, pass, etc)
    update(user): Observable<User> {
        return this.apiService.put('/user', { user })
          .map(data => {
        // Update the currentUser observable
            this.currentUserSubject.next(data.user);
            return data.user;
        });
    }
}