
import { ICreateMessage } from '../../../../../src/features/messages/domain/models/ICreateMessage';
import { IMessageRepository } from '../../../../../src/features/messages/domain/repositories/IMessageRepository';
import Message from '../../../../../src/features/messages/infra/typeorm/entities/Message';
import { IMessage } from '../../../../../src/features/messages/domain/models/IMessage';
import { v4 as uuidv4 } from 'uuid';

class FakeMessagesRepository implements IMessageRepository {
  private messages: Message[] = [];

  public async findAll(): Promise<IMessage[]> {
    return this.messages;
  }

  public async findAllByUserId(user_id: string): Promise<IMessage[]> {
    let messagesUserId = [];

    for(let i = 0; i < this.messages.length; i++) {
        if(this.messages[i].user_id === user_id) {
            messagesUserId.push(this.messages[i]);
        }
    } 

    return messagesUserId;
}

  public async findById(id: string): Promise<IMessage | undefined> {
    const message = this.messages.find(message => (message.id = id));

    return message;
  }

  public async create({
    user_id,
    description,
    details,
  }: ICreateMessage): Promise<IMessage> {
    const message = new Message();

    message.id = uuidv4();
    message.user_id = user_id;
    message.description = description;
    message.details = details;

    this.messages.push(message);

    return message;
  }

  public async save(message: Message): Promise<IMessage> {
    const findIndex = this.messages.findIndex(
      findMessage => (findMessage.id = message.id),
    );

    this.messages[findIndex] = message;

    return message;
  }

  public async remove(message: Message): Promise<void> {
    const findIndex = this.messages.findIndex(
      findMessage => (findMessage.id = message.id),
    );

    this.messages.splice(findIndex, 1);
  }
}

export default FakeMessagesRepository;