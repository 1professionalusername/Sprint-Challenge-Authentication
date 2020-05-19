
const supertest = require("supertest");
const server = require("../api/server");
const db = require("../database/dbConfig");


afterAll(async () => {
    await db.destroy();
});

describe("Integration Tests", () => {
    test("Register new user", async () => {
        const newUser = {
            username: "newUser",
            password: "newPassword",
        };
        const res = await supertest(server).post("/auth/register").send(newUser);
        expect(res.statusCode).toBe(409);
        expect(res.type).toBe("application/json");

    });

    it("Expects server error", async () => {
        const res = await supertest(server).post("/auth/register")
        expect(res.statusCode).toBe(500)
    })

    test("Logs in user", async () => {
        const newUser = {
            username: "newUser",
            password: "newPassword",
        };
        const res = await supertest(server).post("/auth/login").send(newUser);
        expect(res.statusCode).toBe(500);
        expect(res.type).toBe("application/json")
        expect(res.body.message).toMatch(/Welcome/i)

    });
});