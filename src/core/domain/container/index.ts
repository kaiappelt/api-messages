import { container } from 'tsyringe';
import { IUserRepository } from '../../../features/users/domain/repositories/IUserRepository';
import UsersRepository from '../../../features/users/infra/repositories/UsersRepository';
import MessageRepository from '../../../features/messages/infra/repositories/MessageRepository';
import { IMessageRepository } from '../../../features/messages/domain/repositories/IMessageRepository';
import "@features/users/domain/providers"
container.registerSingleton<IUserRepository>(
    'UsersRepository',
     UsersRepository
);

container.registerSingleton<IMessageRepository>(
    'MessageRepository',
     MessageRepository
);
