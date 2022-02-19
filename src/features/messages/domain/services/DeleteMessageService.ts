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
        user_id_session
    }: IDeleteMessage): Promise<void> {
        const message = await this.messageRepository.findById(id);

        if(!message) {
            throw new AppError("Registro não encontrado!", 404);
        }
        
        await this.redisCache.invalidate('api-messages-MESSAGES-LIST');
        await this.redisCache.invalidate(`api-messages-MESSAGE-${id}`);
        await this.redisCache.invalidate(`api-messages-MESSAGES-USER-${user_id_session}`);

        await this.messageRepository.remove(message);
    }
}

export default DeleteMessagesService;