import { Component, Inject, Input } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { tap, of, catchError, Observable, delay } from 'rxjs';
import { Comentario } from '../models/comentario';
import { PerfilUser } from '../models/perfilUser';
import { Post } from '../models/post';
import { CommentsDataService } from './comments-data.service';

@Component({
  selector: 'app-comments-data',
  templateUrl: './comments-data.component.html',
  styleUrls: ['./comments-data.component.css']
})
export class CommentsDataComponent {

  post$: Observable<Post> | undefined;
  commentsOfComment$: Observable<Comentario[]> | undefined;
  comentarioForm: FormGroup;
  token: string;
  username: string;
  perfilUser$: Observable<PerfilUser>;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { idPost: number, token: string, username: string },
    public dialogRef: MatDialogRef<CommentsDataComponent>,
    private service: CommentsDataService, 
    private route: Router, 
    private toast: ToastrService) {

    this.getPost();

    this.token = data.token;
    this.username = data.username;

    this.comentarioForm = new FormGroup({
      mensagem: new FormControl("", [Validators.required])
    })

    this.perfilUser$ = this.getUser();
    this.perfilUser$.subscribe(() => { });
  }

  closeComments() {
    this.dialogRef.close();
  }

  comentar(id: number) {

    if (this.comentarioForm.get('mensagem')?.invalid) {
      this.toast.warning("O comentário não pode estar Vazio!", "", {
        timeOut: 1500,
        positionClass: "toast-bottom-center"
      })
      return;
    }

    this.service.comentar(this.comentarioForm, this.data.token, id).pipe(
      tap(() => {

        this.toast.success("Comentou!", "", {
          timeOut: 1000,
          positionClass: "toast-bottom-center"
        });

        this.comentarioForm.reset(this.comentarioForm);

        setTimeout(() => this.getPost(), 1000);

      }),
      catchError(err => {

        this.toast.error("Acesso Expirado!", "", {
          timeOut: 1000,
          positionClass: "toast-bottom-center"
        });

        setTimeout(() => location.replace("/login"), 1000);

        return of();
      })
    ).subscribe(() => { })

  }

  comentarInComentario(id: number) {

    if (this.comentarioForm.get('mensagem')?.invalid) {
      this.toast.warning("Sua resposta não pode estar Vazia!", "", {
        timeOut: 1500,
        positionClass: "toast-bottom-center"
      })
      return;
    }

    this.service.comentarInComentario(this.comentarioForm, this.data.token, id).pipe(
      tap(() => {

        this.toast.success("Respondeu!", "", {
          timeOut: 1000,
          positionClass: "toast-bottom-center"
        });

        setTimeout(() => {
          this.getPost();
          this.getCommentsOfComment(id);
        }, 1000);
      }
      ),
      catchError(err => {

        this.toast.error("Acesso Expirado!", "", {
          timeOut: 1000,
          positionClass: "toast-bottom-center"
        });

        setTimeout(() => location.replace("/login"), 1000);

        return of();
      })
    ).subscribe(() => { })

    this.comentarioForm.reset(this.comentarioForm);
  }

  getUser() {
    return this.service.getPerfilUser(this.data.token).pipe(

      catchError(err => {
        this.toast.error("Acesso Expirado!", "", {
          timeOut: 1000,
          positionClass: "toast-bottom-center"
        });

        setTimeout(() => location.replace("/login"), 1000);
        return of();
      })
    )
  }

  verificarAutenticidade(comment: Comentario) {
    return comment.autor == this.username;
  }

  visitUser(autor: string) {
    this.dialogRef.close();
    this.route?.navigateByUrl("/user-data/", {
      state: {
        token: this.data.token,
        autor: autor
      }
    });
  }

  apagarComentario(id: number) {

    this.service.apagarComentario(id, this.data.token).pipe(
      tap(res => {
        this.toast.success("Apagou!", "", {
          timeOut: 1000,
          positionClass: "toast-bottom-center"
        })

        setTimeout(() => this.getPost(), 1000);
      }),
      catchError(err => {

        this.toast.error("Acesso Expirado!", "", {
          timeOut: 1000,
          positionClass: "toast-bottom-center"
        });

        setTimeout(() => location.replace("/login"), 1000);
        return of();
      })
    ).subscribe(() => { })
  }

  getPost() {

    this.post$ = this.service.getPost(this.data.idPost, this.data.token).pipe(
      tap(res => {
        console.log("Sucess Comments");
      }),
      catchError(err => {

        this.toast.error("Acesso Expirado!", "", {
          timeOut: 1000,
          positionClass: "toast-bottom-center"
        });

        setTimeout(() => location.replace("/login"), 1000);

        return of();
      })
    );
  }

  getCommentsOfComment(id: number) {

    this.commentsOfComment$ = this.service.getCommentsOfComment(id, this.data.token).pipe(
      tap(res => {
        console.log("Sucess Comments");
      }),
      catchError(err => {
        console.log(err);
        return of();
      })
    );
  }

}
