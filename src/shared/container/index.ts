import { container } from 'tsyringe';
import { IUserRepository } from '@modules/users/domain/repositories/IUserRepository';
import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';
import MessageRepository from '@modules/messages/infra/typeorm/repositories/MessageRepository';
import { IMessageRepository } from '@modules/messages/domain/repositories/IMessageRepository';

container.registerSingleton<IUserRepository>(
    'UsersRepository',
     UsersRepository
);

container.registerSingleton<IMessageRepository>(
    'MessageRepository',
     MessageRepository
);
