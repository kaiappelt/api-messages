import AppError from "../../../../core/domain/errors/AppError";
import { inject, injectable } from "tsyringe";
import { IDeleteMessage } from "../models/IDeleteMessage";
import { IMessageRepository } from "../repositories/IMessageRepository";
import RedisCache from "../../../../core/infra/repositories/CacheRepository";

@injectable()
class DeleteMessagesService {
    constructor(
        @inject("MessageRepository")
        private messageRepository: IMessageRepository,
        private redisCache: RedisCache
    ) {}

    public async execute({
        id,
    }: IDeleteMessage): Promise<void> {
        const message = await this.messageRepository.findById(id);

        if(!message) {
            throw new AppError("Registro não encontrado!", 400);
        }
        
        await this.redisCache.invalidate('api-messages-MESSAGES-LIST');
        await this.redisCache.invalidate('api-messages-MESSAGE-ID');
        await this.redisCache.invalidate('api-messages-MESSAGES-USER-ID');

        await this.messageRepository.remove(message);
    }
}

export default DeleteMessagesService;