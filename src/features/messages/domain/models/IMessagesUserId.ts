import { IUserSession } from "../../../users/domain/models/IUserSession";
export interface IMessagesUserId {
    id: string;
    user_id: string;
    description: string;
    details: string;
    user: IUserSession;
}