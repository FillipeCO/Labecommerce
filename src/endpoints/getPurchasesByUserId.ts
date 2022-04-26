import { Request, Response } from "express";
import { connection } from "../data/connection";

export async function getPurchasesByUserId(req: Request, res: Response) {
  try {
    const { user_id } = req.params;
    const purchases = await connection("labecommerce_purchases")
      .where("user_id", user_id)
      .select("*");
    if (purchases.length === 0) {
      res.status(404).send({ message: "No purchases found" });
      return;
    }
    res.status(200).send(purchases);
  } catch (error: any) {
    res.status(400).send({
      message: "Fail to get purchases",
      error: error.message,
    });
  }
}
