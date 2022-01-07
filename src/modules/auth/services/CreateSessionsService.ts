import User from "@modules/users/infra/typeorm/entities/User";
import UsersRepository from "@modules/users/infra/typeorm/repositories/UsersRepository";
import authConfig from "@config/auth"
import { compare } from "bcryptjs";
import { Response } from "express";
import AppError from "@shared/errors/AppError";
import { getCustomRepository } from "typeorm";
import { sign } from "jsonwebtoken";

interface IRequest {
    email: string;
    password: string;
}

interface IResponse {
    user: User;
    token: string;
}

class CreateSessionsService {
    public async execute({ email, password}: IRequest): Promise<IResponse> {
        const usersRepository = getCustomRepository(UsersRepository);

        const user = await usersRepository.findByEmail(email);

        if(!user) {
            throw new AppError('E-mail ou senha incorretos', 401);
        }

        const passwordConfirmed = await compare(password, user.password);

        if(!passwordConfirmed) {
            throw new AppError('E-mail ou senha incorretos', 401);
        }

        const token = sign({}, authConfig.jwt.secret,{
            subject: user.id,
            expiresIn: authConfig.jwt.expiresIn,
        });

        return {
            user, 
            token,
        };

    }
}

export default CreateSessionsService;