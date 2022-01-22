import { Request, Response } from "express";
import CreateUserService from "../../services/CreateUserService";
import { container } from "tsyringe";
import { IController } from "../../../../../core/presentation/contracts/IController";

export default class CreateUserController implements IController {
    public async run(
        request: Request, 
        response: Response
        ):Promise<Response> {
        const { name, email, password } = request.body;

        const createUser = container.resolve(CreateUserService);

        const user = await createUser.execute({
            name,
            email,
            password
        });

        return response.json(user);
    }
}

