"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllProductsDesafio = exports.getAllProducts = void 0;
const connection_1 = require("../data/connection");
function getAllProducts(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const products = yield connection_1.connection.select("*").from("labecommerce_products");
            if (products.length === 0) {
                res.status(404).send({ message: "Não existem produtos cadastrados" });
                return;
            }
            res.status(200).send(products);
        }
        catch (error) {
            res.status(400).send({
                message: "Falha ao buscar produtos",
                error: error.message,
            });
        }
    });
}
exports.getAllProducts = getAllProducts;
function getAllProductsDesafio(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { order, search } = req.query;
            let products = yield connection_1.connection.select("*").from("labecommerce_products");
            if (search) {
                products = products.filter((product) => product.name.toLowerCase().includes(search));
            }
            if (order) {
                products = products.sort((a, b) => {
                    if (order === "asc") {
                        return a.name.localeCompare(b.name);
                    }
                    else {
                        return b.name.localeCompare(a.name);
                    }
                });
            }
            if (products.length === 0) {
                res.status(404).send({ message: "Products not found" });
                return;
            }
            res.status(200).send(products);
        }
        catch (error) {
            res.status(400).send({
                message: "Falha ao buscar produtos",
                error: error.message,
            });
        }
    });
}
exports.getAllProductsDesafio = getAllProductsDesafio;
