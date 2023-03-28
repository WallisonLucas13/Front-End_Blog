import { Component } from '@angular/core';
import { catchError, Observable, of, tap } from 'rxjs';
import { PerfilUser } from '../models/perfilUser';
import { UserPerfilDataService } from './user-perfil-data.service';

@Component({
  selector: 'app-user-perfil-data',
  templateUrl: './user-perfil-data.component.html',
  styleUrls: ['./user-perfil-data.component.css']
})
export class UserPerfilDataComponent {

  username: string;
  perfilUser$: Observable<PerfilUser> | undefined;
  token: string;

  constructor(private service: UserPerfilDataService) {

    this.username = String(window.localStorage.getItem("visitUser"));
    this.token = String(window.localStorage.getItem("token"));

    this.getPerfilUser();
  }

  getPerfilUser() {
    this.perfilUser$ = this.service.getUserProfile(this.username, this.token).pipe(

      catchError(err => {
        console.log(err);
        return of();
      })
    );
    this.perfilUser$.subscribe(() => { });
  }
}
