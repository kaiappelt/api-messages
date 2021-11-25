import { Request, Response } from "express";
import { v4 } from "uuid";
import AppError from "../../AppError";

let messages: Array<any>;
messages = [
    {
        id: '3fc18d8e-a6be-4ae6-8a6a-f28d28895b23',
        description: 'Limpar o quintal',
        details: 'Cortar a grama'
    },
    {
        id: '8c929f57-81d4-40f1-ae46-6814044ff6c5',
        description: 'Consertar a pia',
        details: 'Cano está quebrado'
    },
];

interface IRequest{
    description: string,
    details: string,
}

export default class MessagesController {

    index(request: Request, response: Response) {
        response.json(messages);
    }

    show(request: Request, response: Response){
        const { id } = request.params;

        let messageExists:boolean;
        messageExists = false;
        
        // Verifica se existe um usuário
        for (let i = 0; i < messages.length; i++){
            if(messages[i].id == id) {
                messageExists = true;
            }
        }

        if(!messageExists){
            // Gera uma exeption de erro
            throw new AppError("Registro não encontrado!")
        }

        let message = {};

        for (let i = 0; i < messages.length; i++){
            if(messages[i].id == id) {
                message = messages[i];
            }
        }

        response.json(message);        
    }

    create(request: Request, response: Response) {
        let { description, details } = request.body;

        let uuid = v4();

        let newMessage = { 
            id:uuid, 
            description,
            details
        };

        messages.push(newMessage);

        response.json(newMessage);
    }

    update(req:Request, res:Response){
        const { id } = req.params;

        let messageExists:boolean;
        messageExists = false;
        
        // Verifica se existe um usuário
        for (let i = 0; i < messages.length; i++){
            if(messages[i].id == id) {
                messageExists = true;
            }
        }

        if(!messageExists){
            // Gera uma exeption de erro
            throw new AppError("Registro não encontrado!")
        }

        let {
            description,
            details,
        }: IRequest = req.body;

        for (let i = 0; i < messages.length; i++){
            if(messages[i].id == id) {
                // Atualiza as informações do id específico
                messages[i].description = description;
                messages[i].details = details;
            }
        }
         
        res.status(200).json(
            {
                description,
                details,
            }
        );
    }

    delete(req:Request, res:Response){
        const { id } = req.params;

        let messageExists:boolean;
        messageExists = false;

        for (let i = 0; i < messages.length; i++){
            if(messages[i].id == id) {
                messageExists = true;
            }
        }

        if(!messageExists){
            // Gera uma exeption de erro
            throw new AppError("Registro não encontrado!")
        }

        // percorre o array procurando o id passado por parametro
        for (let i = 0; i < messages.length; i++){
            if(messages[i].id == id) {
                //exclui o objeto com id encontrado
                messages.splice(i, 1);
            }
        }

        res.json([]);
    }
}