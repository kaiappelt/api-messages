import { inject, injectable } from "tsyringe";
import { IMessage } from "../domain/models/IMessage";
import { IMessageRepository } from "../domain/repositories/IMessageRepository";

@injectable()
class ListMessagesService {
    constructor(
        @inject("MessageRepository")
        private messageRepository: IMessageRepository
    ) {}

    public async execute(): Promise<IMessage[]> {
        const messages = await this.messageRepository.findAll();

        return messages;
    }
}

export default ListMessagesService;