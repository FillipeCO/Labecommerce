import { Request, Response } from "express";
import { connection } from "../data/connection";

export async function createPurchase(req: Request, res: Response) {
  try {
    const { user_id, product_id, quantity } = req.body;
    const price = await connection("labecommerce_products")
      .where("id", product_id)
      .select("price")
      .first();
    const total_price: number = price.price * quantity;
    const id: string = Date.now().toString();

    if (!user_id || !product_id || !quantity) {
      res
        .status(400)
        .send({
          message:
            "Missing fields, User ID, Product ID, Quantity or Total Price",
        });
      return;
    } else if (quantity < 0) {
      res.status(400).send({ message: "Quantity must be greater than 0" });
      return;
    } else if (total_price <= 0) {
      res.status(400).send({ message: "Total Price must be greater than 0" });
      return;
    }

    const purchase = await connection
      .insert({
        id,
        user_id,
        product_id,
        quantity,
        total_price,
      })
      .into("labecommerce_purchases");

    res.status(200).send({
      message: "Purchase created!",
    });
  } catch (error: any) {
    res.status(400).send({
      message: "Fail to create purchase",
      error: error.message,
    });
  }
}
