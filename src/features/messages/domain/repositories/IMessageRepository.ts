import { ICreateMessage } from "../models/ICreateMessage";
import { IMessage } from "../models/IMessage";
import { IMessagesUserId } from "../models/IMessagesUserId";

export interface IMessageRepository {
  findAll(): Promise<IMessage[]>;
  findAllByUserId(user_id: string): Promise<IMessagesUserId[]>;
  findById(id: string): Promise<IMessage | undefined>;
  create(data: ICreateMessage): Promise<IMessage>;
  save(message: IMessage): Promise<IMessage>;
  remove(message: IMessage): Promise<void>;
}