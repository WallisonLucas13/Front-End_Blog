import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class NewPostService {

  private API_FORUM_POST: string = "https://back-endblog-production.up.railway.app/forum/post";
  private HEADER_NAME: string = "Authorization";
  private HEADER_BODY: string = "Bearer ";
  private HEADER: HttpHeaders = new HttpHeaders();

  constructor(private http: HttpClient) { }

  save(form: FormGroup, token: string) {

    this.HEADER_BODY = "Bearer ";

    this.HEADER_BODY += token;

    this.HEADER = this.HEADER.set(this.HEADER_NAME, this.HEADER_BODY);

    return this.http.post(this.API_FORUM_POST, form.value, { headers: this.HEADER });
  }
}
