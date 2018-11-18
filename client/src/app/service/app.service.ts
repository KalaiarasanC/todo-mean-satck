import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import * as Cookies from 'es-cookie';
// import 'rxjs/Rx';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  hostUrl = 'http://localhost:8000/';
  headers = new Headers();
  constructor(
    private http: Http,
    private router: Router
  ) {
    this.getToken();
  }

  getToken() {
    const token = Cookies.get('token');
    console.log('Token', token);
    if (token) {
      this.headers.append('Authorization', 'bearer ' + token);
    }
  }
  getMethod(url): Observable<any> {
    return this.http.get(this.hostUrl + url, { headers: this.headers })
      .pipe(map((res: Response) => res.json() || {}));
  }

  postMethod(url, data): Observable<any> {
    const options = new RequestOptions({ headers: this.headers });
    return this.http.post(this.hostUrl + url, data, options)
      .pipe(
        map((res: Response) => res.json() || {})
      );
  }
  deleteMethod(url): Observable<any> {
    return this.http.delete(this.hostUrl + url, { headers: this.headers })
      .pipe(map((res: Response) => res.json() || {}));

  }
  putMethod(url, data): Observable<any> {
    return this.http.put(this.hostUrl + url, data, { headers: this.headers })
      .pipe(map((res: Response) => res.json() || {}));
  }

  getList() {
    return this.getMethod('todo');
  }

  addList(obj) {
    return this.postMethod('todo/create', obj);
  }

  updateList(id, data) {
    return this.putMethod('todo/update/' + id, data);
  }

  removeList(id) {
    return this.deleteMethod('todo/delete/' + id);
  }

  signup(obj) {
    return this.postMethod('user/signup', obj);
  }

  login(obj) {
    return this.postMethod('user/login', obj);
  }
  logOut() {
    Cookies.set('token', '');
    this.router.navigate(['login']);
  }

  errHandler(err) {
    if (err.status === 401) {
      // this.logOut();
    }
  }
}
