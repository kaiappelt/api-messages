import authConfig from "@config/auth"
import { compare } from "bcryptjs";
import { Response } from "express";
import AppError from "@shared/errors/AppError";
import { getCustomRepository } from "typeorm";
import { sign } from "jsonwebtoken";
import { inject, injectable } from "tsyringe";
import { IUserRepository } from "@modules/users/domain/repositories/IUserRepository";
import { ICreateSessions } from "../domain/models/ICreateSessions";
import { IUserAuth } from "../domain/models/IUserAuth";

@injectable()
class CreateSessionsService {
    constructor(
        @inject("UsersRepository")
        private usersRepository: IUserRepository
    ) {}

    public async execute({ email, password}: ICreateSessions): Promise<IUserAuth> {
        const user = await this.usersRepository.findByEmail(email);

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