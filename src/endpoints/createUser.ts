import { Request, Response } from "express";
import { connection } from "../data/connection";

export async function createUser(req: Request, res: Response) {
  try {
    const { name, email, password } = req.body;
    const id: string = Date.now().toString();

    if (!name || !email || !password) {
      res
        .status(400)
        .send({ message: "Missing fields, Name, Email or Password" });
      return;
    } else if (password.length < 6) {
      res
        .status(400)
        .send({ message: "Password must have at least 6 characters" });
      return;
    }

    const user = await connection
      .insert({
        id,
        name,
        email,
        password,
      })
      .into("labecommerce_users");

    res.status(200).send({
      message: "User created!",
    });
  } catch (error: any) {
    res.status(400).send({
      message: "Fail to create user",
      error: error.message,
    });
  }
}
