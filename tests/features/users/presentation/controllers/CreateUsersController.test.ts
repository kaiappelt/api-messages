import request from "supertest";
import { app } from "../../../../../src/core/presentation/http/main";

describe("CreateUsersController", () => {
    it("Deve cadastrar um usuário", async () => {
        const response = await request(app).post("/users").send({
            name: "tests integração",
            email: "testsintegração2@hotmail.com",
            password: "12345678",
            password_confirmation: "12345678"
        });
        
        expect(response.status).toBe(200);
    })
})