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
exports.createPurchase = void 0;
const connection_1 = require("../data/connection");
function createPurchase(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { user_id, product_id, quantity } = req.body;
            const price = yield (0, connection_1.connection)("labecommerce_products")
                .where("id", product_id)
                .select("price")
                .first();
            const total_price = price.price * quantity;
            const id = Date.now().toString();
            if (!user_id || !product_id || !quantity) {
                res
                    .status(400)
                    .send({
                    message: "Missing fields, User ID, Product ID, Quantity or Total Price",
                });
                return;
            }
            else if (quantity < 0) {
                res.status(400).send({ message: "Quantity must be greater than 0" });
                return;
            }
            else if (total_price <= 0) {
                res.status(400).send({ message: "Total Price must be greater than 0" });
                return;
            }
            const purchase = yield connection_1.connection
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
        }
        catch (error) {
            res.status(400).send({
                message: "Fail to create purchase",
                error: error.message,
            });
        }
    });
}
exports.createPurchase = createPurchase;
