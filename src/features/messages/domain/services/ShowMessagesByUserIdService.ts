import RedisCache from "../../../../core/infra/repositories/CacheRepository";
import { inject, injectable } from "tsyringe";
import { IMessagesUserId } from "../models/IMessagesUserId";
import { IMessageRepository } from "../repositories/IMessageRepository";
import { IMessage } from "../models/IMessage";

@injectable()
class ShowMessagesByUserIdService {
    constructor(
        @inject("MessageRepository")
        private messageRepository: IMessageRepository,
        private redisCache:RedisCache
    ) {}

    public async execute({ user_id }: IMessagesUserId): Promise<IMessage[]> {
        let messages = await this.redisCache.recover<IMessage[]>(
            `api-messages-MESSAGES-USER-${user_id}`
        );
      
          if(!messages){
            messages = await this.messageRepository.findAllByUserId(user_id);
      
            await this.redisCache.save(`api-messages-MESSAGES-USER-${user_id}`, messages);
          }
          
          return messages;
    }
}

export default ShowMessagesByUserIdService;