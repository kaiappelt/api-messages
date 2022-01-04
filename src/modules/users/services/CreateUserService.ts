import { hash } from 'bcryptjs';
import AppError from 'src/AppError';
import { getCustomRepository } from 'typeorm';
import User from '../entities/User';
import UsersRepository from '../repositories/UsersRepository';

interface IRequest {
    name: string;
    email: string;
    password: string;
}


class CreateUserService {
    public async execute({
        name,
        email,
        password
    }:IRequest): Promise<User> {
        const usersRepository = getCustomRepository(UsersRepository);

        const emailExists = await usersRepository.findByEmail(email);

        if(emailExists) {
            throw new AppError("E-mail já existe!", 412);
        }

        const hashedPassword = await hash(password, 8);

        const user = usersRepository.create({
            name,
            email,
            password: hashedPassword
        });

        await usersRepository.save(user);

        return user;
    }
}

export default CreateUserService;