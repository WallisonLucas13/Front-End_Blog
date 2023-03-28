import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PerfilUser } from '../models/perfilUser';

@Injectable({
  providedIn: 'root'
})
export class UserPerfilDataService {

  private API_PERFIL_USER: string = "https://back-endblog-production.up.railway.app/api/user/ByUsername/";
  private HEADER_NAME: string = "Authorization";
  private HEADER_BODY: string = "Bearer ";
  private HEADER: HttpHeaders = new HttpHeaders();

  constructor(private http: HttpClient) { }

  getUserProfile(username: string, token: string) {

    this.API_PERFIL_USER = "https://back-endblog-production.up.railway.app/api/user/ByUsername/" + username;

    this.HEADER_BODY = "Bearer ";

    this.HEADER_BODY += token;

    this.HEADER = this.HEADER.set(this.HEADER_NAME, this.HEADER_BODY);

    return this.http.get<PerfilUser>(this.API_PERFIL_USER, { headers: this.HEADER });
  }
}
