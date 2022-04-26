import { Request, Response } from "express";
import { connection } from "../data/connection";

export async function getAllUsers(req: Request, res: Response) {
  try {
    const users = await connection
      .select("id", "name", "email")
      .from("labecommerce_users");
    res.status(200).send(users);
  } catch (error: any) {
    res.status(400).send({
      message: "Falha ao buscar usuários",
      error: error.message,
    });
  }
}

export async function getAllUsersDesafio(req: Request, res: Response) {
  try {
    const user = await connection
      .select("id", "name", "email")
      .from("labecommerce_users");
    const purchases = await connection
      .select("*")
      .from("labecommerce_purchases");
    const usersWithPurchases = user.map((user) => {
      const userPurchases = purchases.filter(
        (purchase) => purchase.user_id === user.id
      );
      return { ...user, purchases: userPurchases };
    });
    res.status(200).send(usersWithPurchases);
  } catch (error: any) {
    res.status(400).send({
      message: "Falha ao buscar usuários",
      error: error.message,
    });
  }
}
