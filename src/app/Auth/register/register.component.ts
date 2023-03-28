
import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { catchError, of, tap } from 'rxjs';
import { RegisterService } from './register.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  form: FormGroup;
  hide = true;
  fotoPerfilUrl: string = "https://imgs.search.brave.com/NZV5lpxpXOd3_abVeH4gWceBd583q7nXhF1_CNipmTo/rs:fit:474:225:1/g:ce/aHR0cHM6Ly90c2Uy/Lm1tLmJpbmcubmV0/L3RoP2lkPU9JUC5H/ZnAwbHdFNmg3MTM5/NjI1YS1yM2FBSGFI/YSZwaWQ9QXBp";
  constructor(private service: RegisterService, private toastr: ToastrService) {

    this.form = new FormGroup({
      username: new FormControl("", [Validators.required]),
      email: new FormControl("", [Validators.required]),
      password: new FormControl("", [Validators.required])
    });

  }

  submit() {

    this.form.addControl('fotoPerfil', new FormControl(this.fotoPerfilUrl, []));

    if (this.form.get('username')?.invalid ||
      this.form.get('password')?.invalid ||
      this.form.get('email')?.invalid
    ) {

      this.toastr.warning("Preencha todos os campos!", "", {
        timeOut: 1500,
        positionClass: "toast-bottom-center"
      })
      return;
    }

    this.service.post(this.form)
      .pipe(
        
        tap(() => {
          this.toastr.success("Conta criada com Sucesso!", "", {
            timeOut: 1000,
            positionClass: "toast-bottom-center"
          });

          this.toastr.info("Você receberá um email de boas vindas!", "", {
            timeOut: 2500,
            positionClass: "toast-bottom-center"
          });

          setTimeout(() => location.replace("/login"), 3500);
        }),

        catchError(err => {
          if (err.status == 400) {
            this.toastr.error("Usuário já existe! Escolha outro nome!", "", {
              timeOut: 2000,
              positionClass: "toast-bottom-center"
            })
          }
          return of();
        })
      ).subscribe(() => { });

  }

}
