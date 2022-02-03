import { IUserSession } from '../../../users/domain/models/IUserSession';

export interface IAuth {
  user: IUserSession;
  token: string;
}