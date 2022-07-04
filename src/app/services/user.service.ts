 import { Injectable } from '@angular/core';
 import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, of, throwError,} from 'rxjs';
import { catchError, map,retry,tap } from 'rxjs/operators';

import { User } from '../interfaces/user';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = environment.apiUrl;
  readonly moreParams = ['test1', 'test2'];
  readonly defaultImage = 'https://robohash.org';

  constructor(private http: HttpClient) {}

  // getUsers(): Observable<User[]> {
  //   //HttpHeaders example
  //   // let  myHeaders = new HttpHeaders({'myHeaders':['myValue','myValue2']});
  //   // myHeaders = myHeaders.set('id', '1234');
  //   // myHeaders = myHeaders.append('id', '100');

  //   //HttpParams example 1
  //   // let myParams = new HttpParams().set('page',1).set('size', '5');
  //   // myParams = myParams.set('name', 'premkumar');
  //   // myParams = myParams.append('name', 'kori');

  //   //HttpParams example 2
  //   // const theParams = {['testList']: this.moreParams}
  //   // let myParams = new HttpParams({fromObject: theParams});

  //   //HttpParams example 3
  //   // let myParams = new HttpParams({fromString: 'page=1&size=7'});
  //   // return this.http.get<User[]>(`${this.apiUrl}/users`,{params:myParams});

  //   return this.http.get<User[]>(`${this.apiUrl}/users`);
  // }
  // getUsers(): Observable<User[]> {
  //   return this.http.get<User[]>(`${this.apiUrl}/users`)
  //   .pipe(
  //     //tap(users =>console.log(users)),
  //     map(users => users.map(user => ({
  //       email: user.email,
  //       website: user.website,
  //       phone: user.phone,
  //       username: user.username,
  //       name: user.name.toUpperCase(),
  //       image: `${this.defaultImage}/${user.username.toLowerCase()}`,
  //       isAdmin: user.id === 10? 'admin' :'user'
  //     })))
  //   );
  // }

  // getUsers(): Observable<User[]> {
  //   return this.http.get<User[]>(`${this.apiUrl}/users1111`)
  //   .pipe(
  //     retry(3)
  //   );
  // }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrl}/users`)
    .pipe(
      // catchError((error: any)=>{
      //   return of([]);
      // })
      catchError(this.handleError)

    );
  }
  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMsg = '';
    if(error.status === 404) {
      errorMsg ="Error 404 on server";
    }
    return throwError({code:404, message:"Page not Found or File not found error"});
  }

  getTextFile(): Observable<string> {
    return this.http.get(`assets/text.txt`, {responseType: 'text'});
  }
  getUser(): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/users/1`)
    .pipe(
      map(user => {
        return {...user,isAdmin: true, searchKey: [user.name,user.username]}
      })
    );
  }

  createUser(user: User): Observable<User> {
    return this.http.post<User>(`${this.apiUrl}/users`, user);
  }

  updateUser(user: User): Observable<User> {
    return this.http.put<User>(`${this.apiUrl}/users/${user.id}`, user);
  }

  patchUser(user: User): Observable<User> {
    return this.http.patch<User>(`${this.apiUrl}/users/${user.id}`, user);
  }

  deleteUser(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/users/${id}`);
  }

}
