import { ICreateMessage } from "../../../domain/models/ICreateMessage";
import { IMessage } from "../../../domain/models/IMessage";
import { IMessageRepository } from "../../../domain/repositories/IMessageRepository";
import { getRepository, Repository } from "typeorm";
import Message from "../entities/Message";
import { IMessagesUserId } from "../../../../../features/messages/domain/models/IMessagesUserId";

class MessageRepository implements IMessageRepository {
    private ormRepository: Repository<Message>;

    constructor() {
        this.ormRepository = getRepository(Message);
    }

    public async findAll(): Promise<IMessage[]> {
        const messages = await this.ormRepository.find({ relations: ['user'] });

        return messages;
    }

    public async findAllByUserId(user_id: string): Promise<IMessagesUserId[]> {
        const messages = this.ormRepository.find({
            where: {
                user_id,
            },

            relations: ['user']
        });

        return messages;
    }

    public async findById(id: string): Promise<IMessage | undefined> {
        const message = this.ormRepository.findOne(id);

        return message;
    }

    public async create({
        user_id,
        description,
        details,
    }: ICreateMessage): Promise<IMessage> {
        const message = this.ormRepository.create({
            user_id,
            description,
            details,
        });

        await this.ormRepository.save(message);

        return message;
    }

    public async save(message: Message): Promise<IMessage> {
        await this.ormRepository.save(message)

        return message;
    }

    public async remove(message: Message): Promise<void> {
        await this.ormRepository.remove(message);
    }
}

export default MessageRepository;