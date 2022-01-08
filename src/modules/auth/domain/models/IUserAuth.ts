import { IUser } from "@modules/users/domain/models/IUser";

export interface IUserAuth {
    user: IUser;
    token: string;
}