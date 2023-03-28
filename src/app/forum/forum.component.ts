import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { catchError, first, Observable, of, tap } from 'rxjs';
import { CommentsDataComponent } from '../comments-data/comments-data.component';
import { Forum } from '../models/forum';
import { PerfilUser } from '../models/perfilUser';
import { Post } from '../models/post';
import { ForumService } from './forum.service';

@Component({
  selector: 'app-forum',
  templateUrl: './forum.component.html',
  styleUrls: ['./forum.component.css']
})
export class ForumComponent {

  token: string = "";
  forum$: Observable<Forum> | undefined;
  username: string;
  like_icon: string = "favorite_border";

  constructor(
    private route: Router,
    private service: ForumService,
    private dialog: MatDialog,
    private toast: ToastrService
  ) {

    this.token = String(window.localStorage.getItem("token"));
    this.username = String(window.localStorage.getItem("username"));

    this.getPosts();
  }

  private getPosts() {

    this.forum$ = this.service.getPosts(this.token).pipe(

      catchError(() => {

        this.toast.error("Acesso Expirado!", "", {
          timeOut: 1000,
          positionClass: "toast-bottom-center"
        })
        setTimeout(() => location.replace("/login"), 1000);
        return of();
      })
    );

    this.forum$.subscribe(res => { })
  }

  getCountComments(post: Post) {
    return post.comentarios.length;
  }
  getCountLikes(post: Post) {
    return post.curtirs.length;
  }

  verificarAutenticidade(post: Post) {
    return post.autor == this.username;
  }

  apagarPost(id: number) {

    this.service.apagarPost(id, this.token).pipe(
      tap(() => {

        this.toast.success("Apagou!", "", {
          timeOut: 1000,
          positionClass: "toast-bottom-center"
        })

        setTimeout(() => this.getPosts(), 1000);
      }),
      catchError(err => {

        this.toast.error("Acesso Expirado!", "", {
          timeOut: 1000,
          positionClass: "toast-bottom-center"
        })

        setTimeout(() => location.replace("/login"), 1000);

        return of();
      })
    ).subscribe(() => { })
  }

  visitUser(autor: string) {
    window.localStorage.setItem("visitUser", autor);
    this.route?.navigateByUrl("/user-data");
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
}
