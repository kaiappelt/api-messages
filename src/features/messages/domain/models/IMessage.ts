import { IUser } from "../../../users/domain/models/IUser";

export interface IMessage {
    id: string;
    user_id: string;
    description: string;
    details: string;
    user: IUser;
    created_at: Date;
    updated_at: Date;
}