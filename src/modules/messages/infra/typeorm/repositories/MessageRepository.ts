import { ICreateMessage } from "@modules/messages/domain/models/ICreateMessage";
import { IMessage } from "@modules/messages/domain/models/IMessage";
import { IMessageRepository } from "@modules/messages/domain/repositories/IMessageRepository";
import { getRepository, Repository } from "typeorm";
import Message from "../entities/Message";

class MessageRepository implements IMessageRepository {
    private ormRepository: Repository<Message>;

    constructor() {
        this.ormRepository = getRepository(Message);
    }

    public async findAll(): Promise<IMessage[]> {
        const messages = await this.ormRepository.find();

        return messages;
    }

    public async findById(id: string): Promise<IMessage | undefined> {
        const message = this.ormRepository.findOne(id);

        return message;
    }

    public async create({
        description,
        details,
    }: ICreateMessage): Promise<Message> {
        const message = this.ormRepository.create({
            description,
            details,
        });

        await this.ormRepository.save(message);

        return message;
    }

    public async save(message: Message): Promise<Message> {
        await this.ormRepository.save(message)

        return message;
    }

    public async remove(message: IMessage): Promise<void> {
        await this.ormRepository.remove(message);
    }
}

export default MessageRepository;