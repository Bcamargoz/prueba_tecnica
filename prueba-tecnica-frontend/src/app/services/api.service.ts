import { Injectable } from '@angular/core';
import { of, Observable } from 'rxjs';
import { delay } from 'rxjs/internal/operators';
import { User } from '../interfaces/user';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  apiUrl = "http://127.0.0.1:8000/api/v1/";

  constructor(private http: HttpClient) {

  }

  getUsers(): Observable<Array<User>> {
    const users: Array<User> = [
      { nombres: 'shoe', apellidos: "15.99", cedula: "121212", correo: 'kagskhaskj', telefono: "16536125316" },
      { nombres: 'shoe', apellidos: "15.99", cedula: "121212", correo: 'kagskhaskj', telefono: "16536125316" },
      { nombres: 'shoe', apellidos: "15.99", cedula: "121212", correo: 'kagskhaskj', telefono: "16536125316" }
    ];
    return of(users).pipe(delay(3000));
  }

  getUser(id: number): Observable<any> {
    return this.http.get(this.apiUrl+"usuarios/"+id);
  }

  getRemoteUsers(): Observable<Array<User>> {
    return this.http.get<Array<User>>(this.apiUrl+"usuarios");
  }

  createUser(user: User): Observable<any> {
    return this.http.post<any>(this.apiUrl+"usuarios", user);
  }

  editUser(id: number, user: User): Observable<any> {
    return this.http.put<any>(this.apiUrl+"usuarios/"+id, user);
  }

  deleteUser(id: number): Observable<any> {
    return this.http.delete<any>(this.apiUrl+"usuarios/"+id);
  }
}