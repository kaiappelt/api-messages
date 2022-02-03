import AppError from "../../../../core/domain/errors/AppError";
import { inject, injectable } from "tsyringe";
import { IMessage } from "../../domain/models/IMessage";
import { IShowMessage } from "../../domain/models/IShowMessage";
import { IMessageRepository } from "../../domain/repositories/IMessageRepository";
import RedisCache from "@shared/infra/repositories/CacheRepository";

@injectable()
class ShowMessageService {
    constructor(
        @inject("MessageRepository")
        private messageRepository: IMessageRepository,
        private redisCache:RedisCache
    ) {}

    public async execute({ id }: IShowMessage): Promise<IMessage> {
        let message = await this.redisCache.recover<IMessage>(
            "api-messages-MESSAGE-ID"
          );
      
          if(!message){
            message = await this.messageRepository.findById(id) || null;
      
            await this.redisCache.save("api-messages-MESSAGE-ID", message);
          }

        if(!message) {
            throw new AppError("Registro não encontrado!", 404)
        }

        return message;
    }
}

export default ShowMessageService;