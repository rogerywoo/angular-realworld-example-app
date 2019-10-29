import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
//import { Headers, Http, Response, URLSearchParams } from '@angular/common/http';
import { HttpClient, HttpHeaders, HttpResponse, HttpParams } from '@angular/common/http'; 
import "rxjs/add/observable/throw";
import "rxjs/add/operator/catch";
import "rxjs/add/operator/map";
import {Observable} from "rxjs/Observable";
import { JwtService } from './jwt.service';
import { JSDocTagName } from '@angular/compiler/src/output/output_ast';
import {User} from '../../shared/models'
import { catchError } from 'rxjs/operators';

@Injectable()
export class ApiService {
    constructor(
        private httpClient: HttpClient,
        private jwtService: JwtService,
    ) {}

    private setHeaders(): HttpHeaders {
        let headersConfig = {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        };

        if (this.jwtService){
            headersConfig['Authorization'] = `Token ${this.jwtService.getToken()}`;
        }

        return new HttpHeaders(headersConfig);
    }

    private formatErrors(error: any) {
        console.log(error);
        let jsonError;
        try{
            jsonError = JSON.stringify(error);
        } catch(err)
        {
            console.log(err);
            jsonError = error;
        }


        //     return Observable.throw(error.json());
        return Observable.throw(jsonError);

    }

    // post(path: string, body: Object = {}): Observable<any> { 
    //     if ((path === "/users/login")  || (path === "/users")) {
    //         return this.httpClient.get("assets/data/userToken.json")            
    //           .catch(this.formatErrors)
    //         //.map((res:Response) => new User(res));

    //     } else {
    //         return this.httpClient.post(`${environment.api_url}${path}`, JSON.stringify(body), { headers: this.setHeaders() })
    //           .catch(this.formatErrors);
    //     }
    // }

    post(path: string, body: Object = {}): Observable<any> {
        return this.httpClient.post(
          `${environment.api_url}${path}`,
          JSON.stringify(body)
        ).pipe(catchError(this.formatErrors));
      }

    // get(path: string, params: HttpParams = new HttpParams()): Observable<any> {
    //     if (path.startsWith('/user')) {
    //         return this.httpClient.get("assets/data/userToken.json")            
    //           .catch(this.formatErrors);
    //     //        .map((res:Response) => new User(res));
    //     } else if (path === '/profiles/tester'){
    //         return this.httpClient.get("assets/data/userProfile.json")            
    //             .catch(this.formatErrors);
    //     //        .map((res:Response) => new User(res));
            
    //     } else {
    //         return this.httpClient.get(`${environment.api_url}${path}`, { headers: this.setHeaders(), params: params })
    //           .catch(this.formatErrors)
    //     }
    // }

    get(path: string, params: HttpParams = new HttpParams()): Observable<any> {
        return this.httpClient.get(`${environment.api_url}${path}`, { params })
          .pipe(catchError(this.formatErrors));
      }
    

    // put(path: string, body: Object = {}): Observable<any> {
    //     return this.httpClient.put( `${environment.api_url}${path}`, JSON.stringify(body), { headers: this.setHeaders() })
    //       .catch(this.formatErrors);
    //       //.map((res:Response) => res.json());
    // }

    put(path: string, body: Object = {}): Observable<any> {
        return this.httpClient.put(
          `${environment.api_url}${path}`,
          JSON.stringify(body)
        ).pipe(catchError(this.formatErrors));
    }

    delete(path: string, body: Object = {}): Observable<any> {
        return this.httpClient.delete(
          `${environment.api_url}${path}`
        ).pipe(catchError(this.formatErrors));
    }

}