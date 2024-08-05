import createApp from "../app/app";
import request from "supertest";
import { beforeAll, describe, expect, test } from "@jest/globals";
import connectDatabase from "../services/database.service";
import { config } from "dotenv";
import User from "../models/user.model";
import { hash } from "bcrypt";

config();
const app = createApp();

beforeAll(connectDatabase);

describe("Signin tests", () => {
  test("Should signin user", async () => {
    //Prepare the database
    await User.destroy({ truncate: true });
    const encryptedPassword = await hash("Pera123-", 10);
    await User.create({
      userName: "Pera12",
      email: "tester@test.com",
      password: encryptedPassword,
    });

    //Sending data
    const response = await request(app).post("/api/auth/signin").send({
      userName: "Pera12",
      password: "Pera123-",
    });

    //Data validation
    expect(response.status).toBe(200);
    expect(response.body.id).toBeDefined();
    expect(response.body.userName).toBeDefined();
    expect(response.body.email).toBeDefined();
    expect(response.body.token).toBeDefined();
  });
  test("Should fail to signin user (Invalid Credentials)", async () => {
    //Prepare the database
    await User.destroy({ truncate: true });
    const encryptedPassword = await hash("Pera123-", 10);
    await User.create({
      userName: "Pera12",
      email: "tester@test.com",
      password: encryptedPassword,
    });

    //Sending data
    const response = await request(app).post("/api/auth/signin").send({
      userName: "Pera12",
      password: "Pera1afds23-asdf",
    });

    //Data validation
    expect(response.status).toBe(404);
    expect(response.body.message).toBeDefined();
  });
});
