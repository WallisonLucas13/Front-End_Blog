import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Forum } from '../models/forum';

@Injectable({
  providedIn: 'root'
})
export class ForumService {

  private API_FORUM_GET: string = "https://back-endblog-production.up.railway.app/forum/";
  private API_POST_DELETE: string = "https://back-endblog-production.up.railway.app/forum/delete/";
  private API_PUT_LIKE: string = "https://back-endblog-production.up.railway.app/forum/like";
  private HEADER_NAME: string = "Authorization";
  private HEADER_BODY: string = "Bearer ";
  private HEADER: HttpHeaders = new HttpHeaders();

  constructor(private http: HttpClient) { }

  getPosts(token: string) {

    this.HEADER_BODY = "Bearer ";

    this.HEADER_BODY += token;

    this.HEADER = this.HEADER.set(this.HEADER_NAME, this.HEADER_BODY);

    return this.http.get<Forum>(this.API_FORUM_GET, { headers: this.HEADER });
  }

  apagarPost(id: number, token: string) {

    this.API_POST_DELETE = "https://back-endblog-production.up.railway.app/forum/delete/" + id;

    this.HEADER_BODY = "Bearer ";

    this.HEADER_BODY += token;

    this.HEADER = this.HEADER.set(this.HEADER_NAME, this.HEADER_BODY);

    return this.http.delete(this.API_POST_DELETE, { headers: this.HEADER });
  }

  sendLike(username: string, id: number, token: string) {

    this.API_PUT_LIKE = "https://back-endblog-production.up.railway.app/forum/like/" + username + "/" + id;

    this.HEADER_BODY = "Bearer ";

    this.HEADER_BODY += token;

    this.HEADER = this.HEADER.set(this.HEADER_NAME, this.HEADER_BODY);

    return this.http.put<string>(this.API_PUT_LIKE, null, { headers: this.HEADER });
  }

}
