import { ICreateMessage } from "../models/ICreateMessage";
import { IMessage } from "../models/IMessage";

export interface IMessageRepository {
  findAll(): Promise<IMessage[]>;
  findAllByUserId(user_id: string): Promise<IMessage[]>;
  findById(id: string): Promise<IMessage | undefined>;
  create(data: ICreateMessage): Promise<IMessage>;
  save(message: IMessage): Promise<IMessage>;
  remove(message: IMessage): Promise<void>;
}