import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable, tap, catchError, of } from 'rxjs';
import { PerfilUser } from '../models/perfilUser';
import { HomeService } from './home.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  @ViewChild(MatSidenav)
  sidenav!: MatSidenav;

  token: string;
  username: string;
  perfilUser$: Observable<PerfilUser> | undefined;
  activedAbaStyleClassForum: string = "forumStyle";
  activedAbaStyleClassUser: string = "profile-tool";
  activedAbaStyleClassMinhasPubli: string = "minhasPubliStyle";
  activedAbaStyleClassNewPubli: string = "newPubliStyle";

  constructor(private route: Router,
    private service: HomeService,
    private toastr: ToastrService,
    private observer: BreakpointObserver
  ) {

    this.activedAbaStyleClassForum = "forumStyleActived";

    this.token = String(window.localStorage.getItem("token"));
    this.username = String(window.localStorage.getItem("username"));

    this.getUser();

  }

  ngAfterViewInit() {

    this.observer.observe(['(max-width: 1000px)']).subscribe((res) => {

      if (res.matches) {
        this.sidenav.mode = 'over';
        this.sidenav.close();
      } else {
        this.sidenav.mode = 'side';
        this.sidenav.open();
      }
    });
  }

  getUser() {
    this.perfilUser$ = this.service.getUserProfile(this.token).pipe(

      catchError(err => {
        return of();
      })
    );

    this.perfilUser$.subscribe(() => { })
  }

  toForum() {
    this.activedAbaStyleClassUser = "profile-tool";
    this.activedAbaStyleClassMinhasPubli = "minhasPubliStyle";
    this.activedAbaStyleClassNewPubli = "newPubliStyle"

    this.activedAbaStyleClassForum = "forumStyleActived";
    this.route.navigateByUrl("");

  };

  toMinhasPubli() {
    this.activedAbaStyleClassUser = "profile-tool";
    this.activedAbaStyleClassForum = "forumStyle";
    this.activedAbaStyleClassNewPubli = "newPubliStyle"

    this.activedAbaStyleClassMinhasPubli = "minhasPubliStyleActived";
    this.route.navigateByUrl("/my/posts");
  }

  toUserDetails() {
    this.activedAbaStyleClassForum = "forumStyle";
    this.activedAbaStyleClassMinhasPubli = "minhasPubliStyle";
    this.activedAbaStyleClassNewPubli = "newPubliStyle"

    this.activedAbaStyleClassUser = "userStyleActived";
    this.route.navigateByUrl("/usuario");
  }

  toNewPubli() {
    this.activedAbaStyleClassUser = "profile-tool";
    this.activedAbaStyleClassForum = "forumStyle";
    this.activedAbaStyleClassMinhasPubli = "minhasPubliStyle"

    this.activedAbaStyleClassNewPubli = "newPubliStyleActived";
    this.route.navigateByUrl("/newPost");
  }

  exit() {

    this.toastr.error("Saiu", "", {
      timeOut: 1000,
      positionClass: "toast-bottom-center"
    });
    setTimeout(() => {
      window.localStorage.removeItem("token");
      location.reload();
    }, 1000);
  }

  visitUser(autor: string | undefined) {
    window.localStorage.setItem("visitUser", String(autor));
    this.route?.navigateByUrl("/user-data");
  }

}
