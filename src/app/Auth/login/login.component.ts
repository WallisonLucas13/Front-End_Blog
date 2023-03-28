
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { catchError, of } from 'rxjs';
import { LoginService } from './login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  form: FormGroup;
  hide = true;
  token: string = "";
  username: string | undefined;

  constructor(private toastr: ToastrService, private service?: LoginService, private route?: Router,) {
    this.form = new FormGroup({
      username: new FormControl("", [Validators.required]),
      password: new FormControl("", [Validators.required])
    });
  }

  submit() {
    this.username = this.form.get('username')?.value;

    if (this.form.get('username')?.invalid || this.form.get('password')?.invalid) {
      this.toastr.warning("Preencha todos os campos!", "", {
        timeOut: 1500,
        positionClass: "toast-bottom-center"
      })
      return;
    }

    this.service?.post(this.form)
      .pipe(
        catchError(err => {
          this.toastr.error("Credenciais Inválidas", "", {
            timeOut: 1500,
            positionClass: "toast-bottom-center"
          })
          return of();
        })
      ).subscribe((body) => {
        this.token = body.token;

        window.localStorage.setItem("token", body.token);
        window.localStorage.setItem("username", String(this.username));

        this.toastr.success("Entrou!", "", {
          timeOut: 1000,
          positionClass: "toast-bottom-center"
        });
        this.form.reset(this.form);
        setTimeout(() => { this.route?.navigateByUrl(""); }, 1000);
      }
      );

  }

}