import { inject, injectable } from "tsyringe";
import { ICreateMessage } from "../domain/models/ICreateMessage";
import { IMessage } from "../domain/models/IMessage";
import { IMessageRepository } from "../domain/repositories/IMessageRepository";

@injectable()
class CreateMessagesService {
    constructor(
        @inject("MessageRepository")
        private messageRepository: IMessageRepository
    ) {}

    public async execute({
        user_id,
        description,
        details,
    }: ICreateMessage): Promise<IMessage> {
        const message = await this.messageRepository.create({
            user_id,
            description,
            details,
        });

        return message;
    }
}

export default CreateMessagesService;