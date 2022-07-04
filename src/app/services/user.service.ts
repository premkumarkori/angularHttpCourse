 import { Injectable } from '@angular/core';
 import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../interfaces/user';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = environment.apiUrl;
  readonly moreParams = ['test1', 'test2'];

  constructor(private http: HttpClient) {}

  getUsers(): Observable<User[]> {
    //HttpHeaders example
    // let  myHeaders = new HttpHeaders({'myHeaders':['myValue','myValue2']});
    // myHeaders = myHeaders.set('id', '1234');
    // myHeaders = myHeaders.append('id', '100');

    //HttpParams example 1
    // let myParams = new HttpParams().set('page',1).set('size', '5');
    // myParams = myParams.set('name', 'premkumar');
    // myParams = myParams.append('name', 'kori');

    //HttpParams example 2
    // const theParams = {['testList']: this.moreParams}
    // let myParams = new HttpParams({fromObject: theParams});

    //HttpParams example 3
    // let myParams = new HttpParams({fromString: 'page=1&size=7'});
    // return this.http.get<User[]>(`${this.apiUrl}/users`,{params:myParams});

    return this.http.get<User[]>(`${this.apiUrl}/users`);
  }
  getTextFile(): Observable<string> {
    return this.http.get(`assets/text.txt`, {responseType: 'text'});
  }
  getUser(): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/users/1`);
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
