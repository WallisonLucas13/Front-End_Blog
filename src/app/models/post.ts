import { Comentario } from "./comentario";
import { Curtir } from "./curtir";
import { PerfilUser } from "./perfilUser";

export interface Post{
    id: number,
    autor: string,
    mensagem: string,
    titulo: string,
    data: string,
    hora: string,
    comentarios: Comentario[],
    foto: string,
    perfilUser: PerfilUser,
    curtirs: Curtir[],
    liked: boolean
}