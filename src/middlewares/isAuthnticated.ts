import { NextFunction, Request, Response } from "express";
import AppError from "../AppError";
import { verify } from "jsonwebtoken";
import authConfig from "../config/auth"

export default function isAuthenticated(
    request:Request, 
    response: Response, 
    next: NextFunction 
    ): void {
    const authHeader = request.headers.authorization;

    if(!authHeader){
        throw new AppError("Token não informado!");
    }

    const [, token] = authHeader.split(' ');

    try {
        const decodeToken = verify(token, authConfig.jwt.secret)

        return next();

    } catch {
        throw new AppError("Token inválido!", 401);
    }
}