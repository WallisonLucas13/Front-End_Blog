import { UserModel } from "./userModel";

export interface Curtir{
    id: number;
    userModel: UserModel;
    autor: string;
}