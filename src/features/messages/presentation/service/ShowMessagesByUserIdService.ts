import { inject, injectable } from "tsyringe";
import { IMessage } from "../../domain/models/IMessage";
import { IMessagesUserId } from "../../domain/models/IMessagesUserId";
import { IMessageRepository } from "../../domain/repositories/IMessageRepository";

@injectable()
class ShowMessagesByUserIdService {
    constructor(
        @inject("MessageRepository")
        private messageRepository: IMessageRepository
    ) {}

    public async execute({ user_id }: IMessagesUserId): Promise<IMessage[]> {
        const messages = await this.messageRepository.findAllByUserId(user_id);

        return messages;
    }
}

export default ShowMessagesByUserIdService;