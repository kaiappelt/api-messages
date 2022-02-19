import AppError from "../../../../core/domain/errors/AppError";
import { inject, injectable } from "tsyringe";
import { IMessage } from "../models/IMessage";
import { IShowMessage } from "../models/IShowMessage";
import { IMessageRepository } from "../repositories/IMessageRepository";
import RedisCache from "../../../../core/infra/repositories/CacheRepository";

@injectable()
class ShowMessageService {
    constructor(
        @inject("MessageRepository")
        private messageRepository: IMessageRepository,
        private redisCache:RedisCache
    ) {}

    public async execute({ id }: IShowMessage): Promise<IMessage> {
        let message = await this.redisCache.recover<IMessage>(
            `api-messages-MESSAGE-${id}`
          );
      
          if(!message){
            message = await this.messageRepository.findById(id) || null;
      
            await this.redisCache.save(`api-messages-MESSAGE-${id}`, message);
          }

        if(!message) {
            throw new AppError("Registro não encontrado!", 404)
        }

        return message;
    }
}

export default ShowMessageService;