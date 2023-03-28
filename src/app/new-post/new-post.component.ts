import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { catchError, of, tap } from 'rxjs';
import { NewPostService } from './new-post.service';

@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.css']
})


export class NewPostComponent {

  formPost: FormGroup;
  imgSRC: string | undefined | ArrayBuffer | null;
  labelText = "Inserir foto";
  deleteIcon = false;
  username: string;
  token: string;

  constructor(
    private route: Router,
    private service: NewPostService,
    private toast: ToastrService
  ) {

    this.formPost = new FormGroup({
      titulo: new FormControl("", [Validators.required]),
      mensagem: new FormControl("", [Validators.required])
    })

    this.username = String(window.localStorage.getItem("username"));
    this.token = String(window.localStorage.getItem("token"));
  }

  deleteImage() {
    this.imgSRC = "";
    this.labelText = "Inserir foto";
    this.deleteIcon = false;
  }

  setPreviewImage(event: any) {

    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();

      reader.readAsDataURL(event.target.files[0]);
      reader.onload = (e) => {
        this.imgSRC = e.target?.result;
      };
    }

    this.labelText = "Trocar Foto";
    this.deleteIcon = true;
  }

  salvarPost() {

    this.formPost.addControl('foto', new FormControl(this.imgSRC, []));

    if (this.formPost.get("titulo")?.invalid || this.formPost.get("mensagem")?.invalid) {

      this.toast.warning("Preencha todos os campos!", "", {
        timeOut: 1000,
        positionClass: "toast-bottom-center"
      })

      return;
    }

    this.service.save(this.formPost, this.token).pipe(
      tap(() => {
        this.toast.success("Publicou!", "", {
          timeOut: 1000,
          positionClass: "toast-bottom-center"
        })

        setTimeout(() => this.route.navigateByUrl(""), 1000);
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
}

