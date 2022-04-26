import { Request, Response } from "express";
import { connection } from "../data/connection";

export async function getAllProducts(req: Request, res: Response) {
  try {
    const products = await connection.select("*").from("labecommerce_products");
    if (products.length === 0) {
      res.status(404).send({ message: "Não existem produtos cadastrados" });
      return;
    }
    res.status(200).send(products);
  } catch (error: any) {
    res.status(400).send({
      message: "Falha ao buscar produtos",
      error: error.message,
    });
  }
}

export async function getAllProductsDesafio(req: Request, res: Response) {
  try {
    const { order, search } = req.query;
    let products = await connection.select("*").from("labecommerce_products");
    if (search) {
      products = products.filter((product) =>
        product.name.toLowerCase().includes(search)
      );
    }
    if (order) {
      products = products.sort((a, b) => {
        if (order === "asc") {
          return a.name.localeCompare(b.name);
        } else {
          return b.name.localeCompare(a.name);
        }
      });
    }
    if (products.length === 0) {
      res.status(404).send({ message: "Products not found" });
      return;
    }
    res.status(200).send(products);
  } catch (error: any) {
    res.status(400).send({
      message: "Falha ao buscar produtos",
      error: error.message,
    });
  }
}
