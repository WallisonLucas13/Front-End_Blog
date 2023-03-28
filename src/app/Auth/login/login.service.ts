import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { User } from 'src/app/models/user';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private API_POST: string = "https://back-endblog-production.up.railway.app/api/login";

  constructor(private http: HttpClient) { }

  post(form: FormGroup) {
    return this.http.post<User>(this.API_POST, form.value, { observe: 'body' });
  }
}
