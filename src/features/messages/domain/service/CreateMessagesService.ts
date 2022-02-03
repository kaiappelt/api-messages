import { IUserRepository } from "@modules/users/domain/repositories/IUserRepository";
import AppError from "@shared/domain/errors/AppError";
import RedisCache from "@shared/infra/repositories/CacheRepository";
import { inject, injectable } from "tsyringe";
import { ICreateMessage } from "../../domain/models/ICreateMessage";
import { IMessage } from "../../domain/models/IMessage";
import { IMessageRepository } from "../../domain/repositories/IMessageRepository";

@injectable()
class CreateMessagesService {
    constructor(
        @inject("MessageRepository")
        private messageRepository: IMessageRepository,

        @inject('UsersRepository')
        private usersRepository: IUserRepository,

        private redisCache: RedisCache
    ) {}

    public async execute({
        user_id,
        description,
        details,
    }: ICreateMessage): Promise<IMessage> {
        const user = await this.usersRepository.findById(user_id);

        if (!user) {
             throw new AppError("Usuário não encontrado", 404);
        }

        await this.redisCache.invalidate('api-messages-MESSAGES-LIST');
        await this.redisCache.invalidate('api-messages-MESSAGE-ID');
        await this.redisCache.invalidate('api-messages-MESSAGES-USER-ID');

        const message = await this.messageRepository.create({
            user_id,
            description,
            details,
        });

        return message;
    }
}

export default CreateMessagesService;