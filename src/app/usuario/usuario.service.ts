import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { PerfilUser } from '../models/perfilUser';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private API_FORUM_PUT: string = "https://back-endblog-production.up.railway.app/api/user/atualizar";
  private API_FORUM_POST_FILE: string = "https://back-endblog-production.up.railway.app/api/user/foto";
  private API_PERFIL_USER: string = "https://back-endblog-production.up.railway.app/api/user";
  private HEADER_NAME: string = "Authorization";
  private HEADER_BODY: string = "Bearer ";
  private HEADER: HttpHeaders = new HttpHeaders();

  constructor(private http: HttpClient) { }

  sendUser(form: FormGroup, token: string) {

    this.HEADER_BODY = "Bearer ";

    this.HEADER_BODY += token;

    this.HEADER = this.HEADER.set(this.HEADER_NAME, this.HEADER_BODY);

    return this.http.put<PerfilUser>(this.API_FORUM_PUT, form.value, { headers: this.HEADER });
  }

  salvarFoto(form: FormGroup, token: string) {

    this.HEADER_BODY = "Bearer ";

    this.HEADER_BODY += token;

    this.HEADER = this.HEADER.set(this.HEADER_NAME, this.HEADER_BODY);

    return this.http.post(this.API_FORUM_POST_FILE, form.value, { headers: this.HEADER });
  }

  getUserProfile(token: string) {

    this.HEADER_BODY = "Bearer " + token;

    this.HEADER = this.HEADER.set(this.HEADER_NAME, this.HEADER_BODY);

    return this.http.get<PerfilUser>(this.API_PERFIL_USER, { headers: this.HEADER });
  }
}
