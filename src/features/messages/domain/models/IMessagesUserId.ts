import { IUser } from "../../../users/domain/models/IUser";
export interface IMessagesUserId {
    id: string;
    user_id: string;
    description: string;
    details: string;
    user: IUser;
}