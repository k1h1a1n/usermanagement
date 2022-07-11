import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { UserList } from '../models/userlist';

@Injectable({
  providedIn: 'root'
})
export class UserlistService {

  constructor(private http:HttpClient) { }

  GetUsers():Observable<any>{
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
   };
   return this.http.get<any>(`${environment.baseUrl}/users`);
  }
  createUser(input:UserList):Observable<any>{
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
   };
   return this.http.post<any>(`${environment.baseUrl}/users`,input,httpOptions);
  }
  deleteUser(id: number){
   return this.http.delete<any>(`${environment.baseUrl}/users/${id}`);
  }
}
