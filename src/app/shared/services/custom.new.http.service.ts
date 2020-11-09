import {Observable, of, throwError, throwError as observableThrowError} from 'rxjs';
import {Injectable, Injector} from '@angular/core';
// import {  RequestOptions, RequestOptionsArgs, Response, Headers } from '@angular/http';
import {Router} from '@angular/router';
import {HttpBackend, HttpClient, HttpHeaders} from '@angular/common/http';
import {catchError, map, mergeMap, onErrorResumeNext, retry, share, tap} from 'rxjs/internal/operators';
import {CommonService} from './common.service';
import {URL_CONST} from '../configs/url.constants';


@Injectable()
export class NewHttpService {


    public token: any = null;
    private tokenObservable: any = null;
    private token$: Observable<any>;
    private commonService: CommonService;
    public access_token = localStorage.getItem('access_token');

    public constructor(
        backend: HttpBackend,
        // defaultOptions: HttpHeaders,
        private router: Router,
        injector: Injector,
        private http: HttpClient) {

        // super(backend, defaultOptions);
        // console.log('initialized', commonService);
        setTimeout(() => this.commonService = injector.get(CommonService));

    }


    get(url: string, options?: any): Observable<any> {
        return this.http.get(url, options).pipe(
            catchError(res => {
            if (res.status === 401) {
                return this.updateToken().pipe(mergeMap(token => {
                    return this.http.get(url, this.getRequestHeaderOptions(options));
                }));
            } else {
                catchError(this.handleError);
            }
        }));
    }
    post(url: string, body: any, options?: any): Observable<any> {
        return this.http.post(url, body, options)
          .pipe(catchError(res => {
            if (res.status === 401) {
                return this.updateToken().pipe(mergeMap(token => {
                    return this.http.post(url, body, options);
                }));
            } else {
              catchError(this.handleError);
            }
        }));
    }
    put(url: string, body: any, options?: any): Observable<any> {
        return this.http.put(url, body, options).pipe(
            catchError(res => {
            if (res.status === 401) {
                return this.updateToken().pipe(mergeMap(token => {
                    return this.http.put(url, body, this.getRequestHeaderOptions(options));
                }));
            } else {
              catchError(this.handleError);
            }
        }));
    }

    // delete(url: string, options?: any): Observable<any> {
    //     return this.http.delete(url, options).pipe(catchError((res: Response) => {
    //         if (res.status === 401) {
    //             this.updateToken().pipe(mergeMap(token => {
    //                 return this.http.delete(url, options);
    //             }));
    //         } else {
    //           console.log(res);
    //         }
    //     }));
    // }
    handleError(error) {
      return throwError(error.message || 'Server Error');
    }

    getRequestOptionArgs(options?: any): HttpHeaders {
        if (options == null) {
            const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
            options = { headers };
        }
        return options;
    }
    /**
     * Get default options.
     * @returns {RequestOptions}
     */
    getRequestHeaderOptions(options) {
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + localStorage.getItem('access_token')
        });
        options = { headers };

        return options;
    }
    /**
     * get access token on 401 error.
     * @returns {any}
     */
    getAccessToken(userName, password) {
            let headers = new HttpHeaders();
            headers = headers.append('Content-Type', 'application/x-www-form-urlencoded');
            headers = headers.append('Authorization', 'Basic VVNFUl9DTElFTlRfQVBQOnBhc3N3b3Jk');
            const url = URL_CONST.URL_PREFIX_AUTH + 'oauth/token';
            const body = new URLSearchParams();
            body.set('username', userName);
            body.set('password', password);
            body.set('grant_type', 'password');
            // const credentials = {
            //   username: userName,
            //   password,
            //   grant_type: 'password'
            // };
            return this.http.post(url, body.toString(), { headers })
                .pipe(
                tap((d: any) => {
                    this.token = d.access_token;
                    this.tokenObservable = null;
                    localStorage.setItem('access_token', d.access_token);
                    localStorage.setItem('refresh_token', d.refresh_token);
                    localStorage.setItem('scope', d.scope);
                    localStorage.setItem('email', d.email);
                    localStorage.setItem('id', d.id);
                    localStorage.setItem('token_type', d.token_type);
                }),
                    share()
                );
    }

    updateToken() {
            let headers = new HttpHeaders();
            headers = headers.append('Content-Type', 'application/x-www-form-urlencoded');
            headers = headers.append('Authorization', 'Basic VVNFUl9DTElFTlRfQVBQOnBhc3N3b3Jk');
            const url = URL_CONST.URL_PREFIX_AUTH + 'oauth/token';
            const credentials = 'grant_type=refresh_token&refresh_token=' + localStorage.getItem('refresh_token');


            return this.http.post(url, credentials, {headers})
                .pipe(map((response: Response) => response),
                tap((d: any) => {
                    this.token = d.access_token;
                    this.tokenObservable = null;
                    localStorage.setItem('access_token', d.access_token);
                }),
                retry(3),
                catchError((error: Response) => {
                        this.logout();
                        return onErrorResumeNext();
                }),
                    share()
                );
    }

    logout() {
        localStorage.clear();
      this.router.navigate(['/login']);
        this.logoutUser(this.access_token).subscribe(
            (data) => {
              this.router.navigate(['/login']);
            },
            (error) => {
              this.router.navigate(['/login']);
            }
        );
    }

    private logoutUser(token): Observable<any> {
        const headers = new HttpHeaders();
        headers.append('Authorization', 'Bearer ' + token);

        const url = URL_CONST.URL_PREFIX_AUTH + 'logout';
        const credentials = 'Authorization=Bearer ' + token;

        return this.post(url, { headers });
    }
}
