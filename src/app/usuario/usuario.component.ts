import { BreakpointObserver } from '@angular/cdk/layout';
import { StepperOrientation, STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { catchError, first, map, Observable, of, tap } from 'rxjs';
import { AuthenticationResponse } from '../models/authenticationResponse';
import { PerfilUser } from '../models/perfilUser';
import { UsuarioService } from './usuario.service';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})
export class UsuarioComponent {

  formPerfil: FormGroup = this.builder.group({});
  perfilUser$: Observable<PerfilUser> | undefined;
  valueProgressBar = 0;
  token: string;
  panelOpenState = false;
  arquivo: string = "Nenhum";
  imgSRC: string | undefined | null | ArrayBuffer = "";

  constructor(private route: Router, private service: UsuarioService, private toast: ToastrService, private builder: FormBuilder) {

    this.token = String(window.localStorage.getItem("token"));
    this.getUser();

  }

  save() {

    this.formPerfil.addControl('fotoPerfil', new FormControl(this.imgSRC, []));

    if (
      this.formPerfil.get('sobrenome')?.invalid ||
      this.formPerfil.get('email')?.invalid ||
      this.formPerfil.get('cidade')?.invalid ||
      this.formPerfil.get('estado')?.invalid
    ) {
      this.toast.info("Atenção! Você está se esquecendo de algumas informações!", "", {
        timeOut: 1500,
        positionClass: "toast-bottom-center"
      });
    }

    setTimeout(() => {
      this.service.sendUser(this.formPerfil, this.token).pipe(

        tap(() => {
          this.toast.success("Informações Atualizadas!", "", {
            timeOut: 1500,
            positionClass: "toast-bottom-center"
          })

          setTimeout(() => {
            location.reload();
            this.route.navigateByUrl("/usuario");
          }, 1500);
        }),

        catchError(err => {
          console.log(err)
          return of();
        })
      ).subscribe(() => { })

    }, 1000);
  }

  setPreviewImage(event: any) {

    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();

      reader.readAsDataURL(event.target.files[0]);
      reader.onload = (e) => {
        this.imgSRC = e.target?.result;
      };
    }
  }

  getUser() {

    this.perfilUser$ = this.service.getUserProfile(this.token).pipe(

      tap(perfilUser => {
        this.imgSRC = perfilUser.fotoPerfil;

        this.formPerfil = this.builder.group({
          sobrenome: [perfilUser.sobrenome, Validators.required],
          email: [perfilUser.email, Validators.required],
          cidade: [perfilUser.cidade, Validators.required],
          estado: [perfilUser.estado, Validators.required]
        });
      }),
      catchError(err => {
        return of();
      })
    );

    this.perfilUser$.subscribe(() => { });
  }

}
