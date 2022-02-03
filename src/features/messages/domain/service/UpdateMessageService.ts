import AppError from "../../../../core/domain/errors/AppError";
import { inject, injectable } from "tsyringe";
import { IMessage } from "../../domain/models/IMessage";
import { IUpdateMessage } from "../../domain/models/IUpdateMessage";
import { IMessageRepository } from "../../domain/repositories/IMessageRepository";
import RedisCache from "../../../../core/infra/repositories/CacheRepository";

@injectable()
class UpdateMessagesService {
    constructor(
        @inject("MessageRepository")
        private messageRepository: IMessageRepository,
        private redisCache: RedisCache
    ) {}

    public async execute({
        id,
        description,
        details,
    }: IUpdateMessage): Promise<IMessage> {
        const message = await this.messageRepository.findById(id);

        if(!message) {
            throw new AppError("Registro não encontrado!", 400);
        }

        message.description = description;
        message.details = details;
               
        await this.redisCache.invalidate('api-messages-MESSAGES-LIST');
        await this.redisCache.invalidate('api-messages-MESSAGE-ID');
        await this.redisCache.invalidate('api-messages-MESSAGES-USER-ID');

        await this.messageRepository.save(message)

        return message;
    }
}

export default UpdateMessagesService;