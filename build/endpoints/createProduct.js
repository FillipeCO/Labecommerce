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
exports.createProduct = void 0;
const connection_1 = require("../data/connection");
function createProduct(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { name, price, image_url } = req.body;
            const id = Date.now().toString();
            if (!name || !price || !image_url) {
                res
                    .status(400)
                    .send({
                    message: "Missing fields, Name, Description, Price, Quantity or Category",
                });
                return;
            }
            else if (price < 0) {
                res.status(400).send({ message: "Price must be greater than 0" });
                return;
            }
            const product = yield connection_1.connection
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
        }
        catch (error) {
            res.status(400).send({
                message: "Falha ao criar produto",
                error: error.message,
            });
        }
    });
}
exports.createProduct = createProduct;
