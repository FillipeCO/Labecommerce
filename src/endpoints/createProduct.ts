import { Request, Response } from "express";
import { connection } from "../data/connection";

export async function createProduct(req: Request, res: Response) {
  try {
    const { name, price, image_url } = req.body;
    const id: string = Date.now().toString();

    if (!name || !price || !image_url) {
      res
        .status(400)
        .send({
          message:
            "Missing fields, Name, Description, Price, Quantity or Category",
        });
      return;
    } else if (price < 0) {
      res.status(400).send({ message: "Price must be greater than 0" });
      return;
    }

    const product = await connection
      .insert({
        id,
        name,
        price,
        image_url,
      })
      .into("labecommerce_products");

    res.status(200).send({
      message: "Produto criado com sucesso!",
    });
  } catch (error: any) {
    res.status(400).send({
      message: "Falha ao criar produto",
      error: error.message,
    });
  }
}
