import { container } from 'tsyringe';
import { IUserRepository } from '../../../features/users/domain/repositories/IUserRepository';
import UsersRepository from '../../../features/users/infra/typeorm/repositories/UsersRepository';
import MessageRepository from '../../../features/messages/infra/typeorm/repositories/MessageRepository';
import { IMessageRepository } from '../../../features/messages/domain/repositories/IMessageRepository';

container.registerSingleton<IUserRepository>(
    'UsersRepository',
     UsersRepository
);

container.registerSingleton<IMessageRepository>(
    'MessageRepository',
     MessageRepository
);
