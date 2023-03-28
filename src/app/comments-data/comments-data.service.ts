import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Comentario } from '../models/comentario';
import { PerfilUser } from '../models/perfilUser';
import { Post } from '../models/post';

@Injectable({
  providedIn: 'root'
})
export class CommentsDataService {

  private API_FORUM_POST: string = "https://back-endblog-production.up.railway.app/comentarios/post/";
  private API_FORUM_POST_COMENTARIO: string = "https://back-endblog-production.up.railway.app/comentarios/comentario/";
  private API_FORUM_GET_ALLOF_COMENTARIO: string = "https://back-endblog-production.up.railway.app/comentarios/AllOf/";
  private API_COMENTARIO_DELETE: string = "https://back-endblog-production.up.railway.app/comentarios/delete/";
  private API_PERFIL_USER: string = "https://back-endblog-production.up.railway.app/api/user";
  private API_FORUM_GET_POST: string = "https://back-endblog-production.up.railway.app/forum/post/";
  private HEADER_NAME: string = "Authorization";
  private HEADER_BODY: string = "Bearer ";
  private HEADER: HttpHeaders = new HttpHeaders();

  constructor(private http: HttpClient) { }

  comentar(form: FormGroup, token: string, idPost: number) {

    this.API_FORUM_POST = "https://back-endblog-production.up.railway.app/comentarios/post/" + idPost;

    this.HEADER_BODY = "Bearer ";

    this.HEADER_BODY += token;

    this.HEADER = this.HEADER.set(this.HEADER_NAME, this.HEADER_BODY);

    return this.http.post(this.API_FORUM_POST, form.value, { headers: this.HEADER })
  }

  comentarInComentario(form: FormGroup, token: string, idComentario: number) {

    this.API_FORUM_POST_COMENTARIO = "https://back-endblog-production.up.railway.app/comentarios/comentario/" + idComentario;

    this.HEADER_BODY = "Bearer ";

    this.HEADER_BODY += token;

    this.HEADER = this.HEADER.set(this.HEADER_NAME, this.HEADER_BODY);

    return this.http.post(this.API_FORUM_POST_COMENTARIO, form.value, { headers: this.HEADER })
  }

  getPerfilUser(token: string) {

    this.HEADER_BODY = "Bearer ";

    this.HEADER_BODY += token;

    this.HEADER = this.HEADER.set(this.HEADER_NAME, this.HEADER_BODY);

    return this.http.get<PerfilUser>(this.API_PERFIL_USER, { headers: this.HEADER });
  }

  apagarComentario(id: number, token: string) {

    this.API_COMENTARIO_DELETE = "https://back-endblog-production.up.railway.app/comentarios/delete/" + id;

    this.HEADER_BODY = "Bearer ";

    this.HEADER_BODY += token;

    this.HEADER = this.HEADER.set(this.HEADER_NAME, this.HEADER_BODY);

    return this.http.delete(this.API_COMENTARIO_DELETE, { headers: this.HEADER });
  }

  getPost(id: number, token: string) {

    this.API_FORUM_GET_POST = "https://back-endblog-production.up.railway.app/forum/post/" + id;

    this.HEADER_BODY = "Bearer ";

    this.HEADER_BODY += token;

    this.HEADER = this.HEADER.set(this.HEADER_NAME, this.HEADER_BODY);

    return this.http.get<Post>(this.API_FORUM_GET_POST, { headers: this.HEADER });

  }

  getCommentsOfComment(id: number, token: string) {

    this.API_FORUM_GET_ALLOF_COMENTARIO = "https://back-endblog-production.up.railway.app/comentarios/AllOf/" + id;

    this.HEADER_BODY = "Bearer ";

    this.HEADER_BODY += token;

    this.HEADER = this.HEADER.set(this.HEADER_NAME, this.HEADER_BODY);

    return this.http.get<Comentario[]>(this.API_FORUM_GET_ALLOF_COMENTARIO, { headers: this.HEADER });
  }
}
