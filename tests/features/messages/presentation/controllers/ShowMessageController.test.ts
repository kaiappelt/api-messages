import request from 'supertest';
import { app } from "../../../../../src/core/presentation/http/main";
import { v4 as uuidv4 } from 'uuid';

let token: string;

describe('ShowMessageController', () => {
    beforeEach(async () => {
        // Cria o usuário
        await request(app).post('/users').send({
            name: 'usuário teste',
            email: 'usuario@teste.com.br',
            password: '12345678',
            password_confirmation: '12345678',
        });

        // Faz a autenticação
        const responseAuth = await request(app).post('/auth').send({
            email: 'usuario@teste.com.br',
            password: '12345678',
        });

        token = responseAuth.body.token;
    });

    it('Estando autenticado, deve listar uma mensagem pelo id', async () => {
        // Cria uma mensagem
        const responseCreateMessage = await request(app)
            .post('/messages')
            .send({
                description: "mensagem teste",
                details: "mensagem teste"
            })
            .set('Authorization', `Bearer ${token}`);

        const messageId = responseCreateMessage.body.id; 
    
        // Lista a mensagem criada
        const responseMessageId = await request(app)
            .get(`/messages/${messageId}`)
            .set('Authorization', `Bearer ${token}`);  
            
        expect(responseMessageId.status).toBe(200);
    });

    it('Não deve listar a mensagem, quando não houver autenticação', async () => {
        expect(
            request(app)
            .get(`/messages/${uuidv4()}`)
        ).rejects;
    });

    it('Não deve listar uma mensagem, que não existe', async () => {
        expect(
            request(app)
            .get(`/messages/${uuidv4()}`)
            .set('Authorization', `Bearer ${token}`)
        ).rejects;
    });
});