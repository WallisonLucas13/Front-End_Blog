import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { PerfilUser } from '../models/perfilUser';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  private API_PERFIL_USER: string = "https://back-endblog-production.up.railway.app/api/user";
  private HEADER_NAME: string = "Authorization";
  private HEADER_BODY: string = "Bearer ";
  private HEADER: HttpHeaders = new HttpHeaders();

  constructor(private http: HttpClient) { }

  getUserProfile(token: string) {

    this.HEADER_BODY = "Bearer " + token;

    this.HEADER = this.HEADER.set(this.HEADER_NAME, this.HEADER_BODY);

    return this.http.get<PerfilUser>(this.API_PERFIL_USER, { headers: this.HEADER });
  }

}
