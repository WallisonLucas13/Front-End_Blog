import { PerfilUser } from "./perfilUser";

export interface Comentario{
    id: number,
    autor: string,
    mensagem: string,
    data: string,
    hora: string,
    comentarios: Comentario[],
    perfilUser: PerfilUser
}