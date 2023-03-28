import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { catchError, Observable, of, tap } from 'rxjs';
import { CommentsDataComponent } from '../comments-data/comments-data.component';
import { Post } from '../models/post';
import { MinhasPublicacoesService } from './minhas-publicacoes.service';

@Component({
  selector: 'app-minhas-publicacoes',
  templateUrl: './minhas-publicacoes.component.html',
  styleUrls: ['./minhas-publicacoes.component.css']
})
export class MinhasPublicacoesComponent {

  posts$: Observable<Post[]> | undefined;
  token: string;
  username: string;
  like_icon: string = "";

  constructor(
    private service: MinhasPublicacoesService,
    private dialog: MatDialog,
    private toast: ToastrService
  ){

    this.token = String(window.localStorage.getItem("token"));
    this.username = String(window.localStorage.getItem("username"));
    this.getPosts();
  }

  getPosts() {

    this.posts$ = this.service.getPostsProfile(this.token).pipe(
      tap(() => { }),
      catchError(err => {
        location.replace("/login");
        console.log(err);
        return of();
      })
    );
    this.posts$.subscribe(() => { });
  }

  apagarPost(id: number) {
    this.service.apagarPost(id, this.token).pipe(
      tap(() => { location.reload() }),
      catchError(err => {
        console.log(err);
        return of();
      })
    ).subscribe(() => { })
  }

  getCountComments(post: Post) {
    return post.comentarios.length;
  }

  openDialog(id: number) {

    const ref = this.dialog.open(CommentsDataComponent, {
      data: { idPost: id, token: this.token, username: this.username }
    });

    ref.afterClosed().subscribe(() => this.getPosts());
  }

  verifyLiked(post: Post) {

    for (let i = 0; i < post.curtirs.length; i++) {

      if (post.curtirs[i].autor == this.username) {
        post.liked = true;
        return "favorite";
      }
    }

    post.liked = false;
    return "favorite_border";
  }

  sendLike(id: number) {

    this.service.sendLike(this.username, id, this.token).pipe(

      catchError(err => {

        if (err.status == 200) {

          if (err.error.text == "curtiu") {

            this.toast.success("Curtiu!", "", {
              timeOut: 1000,
              positionClass: "toast-bottom-center"
            });
            setTimeout(() => this.getPosts(), 1000);

            this.like_icon = "favorite";
          }

          else {

            this.toast.warning("Retirado!", "", {
              timeOut: 1000,
              positionClass: "toast-bottom-center"
            });

            setTimeout(() => this.getPosts(), 1000);
            this.like_icon = "favorite_border";
          }
        }
        return of();
      })
    ).subscribe(() => { })
  }

  getCountLikes(post: Post) {
    return post.curtirs.length;
  }


}
