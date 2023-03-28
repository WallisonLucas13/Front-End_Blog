import { RouterModule, Routes } from "@angular/router";
import { ModuleWithProviders } from "@angular/core";
import { LoginComponent } from "src/app/Auth/login/login.component";
import { RegisterComponent } from "src/app/Auth/register/register.component";
import { ForumComponent } from "src/app/forum/forum.component";
import { UsuarioComponent } from "src/app/usuario/usuario.component";
import { MinhasPublicacoesComponent } from "src/app/minhas-publicacoes/minhas-publicacoes.component";
import { UserPerfilDataComponent } from "src/app/user-perfil-data/user-perfil-data.component";
import { NewPostComponent } from "src/app/new-post/new-post.component";
import { AuthenticationComponent } from "src/app/Auth/authentication/authentication.component";
import { AuthGuard } from "src/app/Auth/auth-guard";
import { HomeComponent } from "src/app/home/home.component";

const ROUTES: Routes = [

    {
        path: '',
        component: HomeComponent,
        children: [
            {path: '', component: ForumComponent},
            {path: 'forum', component: ForumComponent},
            {path: 'usuario', component: UsuarioComponent},
            {path: 'my/posts', component: MinhasPublicacoesComponent},
            {path: 'user-data/:username', component: UserPerfilDataComponent},
            {path: 'user-data', component: UserPerfilDataComponent},
            {path: 'newPost/:username', component: NewPostComponent},
            {path: 'newPost', component: NewPostComponent}
        ],
        canActivate: [AuthGuard]
    },

    {
        path: '',
        component: AuthenticationComponent,
        children: [
            {path: '', redirectTo: 'login', pathMatch: 'full'},
            {path: "login", component: LoginComponent},
            {path: 'register', component: RegisterComponent},
        ]  
    }
]

export const routing: ModuleWithProviders<RouterModule> = RouterModule.forRoot(ROUTES);