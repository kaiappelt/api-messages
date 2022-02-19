import AppError from "../../../domain/errors/AppError";
import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import authConfig from "../../../../config/auth"
import { Secret } from "jsonwebtoken";

interface ITokenPayload {
    iat: number;
    exp: number;
    sub: string;
  }

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
        const decodedToken = verify(token, authConfig.jwt.secret as Secret);

    const { sub } = decodedToken as ITokenPayload;

    request.user = {
      id: sub,
    };

    return next();

    } catch {
        throw new AppError("Token inválido!", 401);
    }
}