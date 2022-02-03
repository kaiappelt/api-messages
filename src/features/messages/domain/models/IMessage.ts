import { IUser } from "@modules/users/domain/models/IUser";
import { IUserSession } from "../../../users/domain/models/IUserSession";

export interface IMessage {
    id: string;
    user_id: string;
    description: string;
    details: string;
    user: IUser;
    created_at: Date;
    updated_at: Date;
}