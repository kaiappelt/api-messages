import { IUser } from "../../../users/domain/models/IUser";

export interface IUserAuth {
    user: IUser;
    token: string;
}