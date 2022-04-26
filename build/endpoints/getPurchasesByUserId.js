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
exports.getPurchasesByUserId = void 0;
const connection_1 = require("../data/connection");
function getPurchasesByUserId(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { user_id } = req.params;
            const purchases = yield (0, connection_1.connection)("labecommerce_purchases")
                .where("user_id", user_id)
                .select("*");
            if (purchases.length === 0) {
                res.status(404).send({ message: "No purchases found" });
                return;
            }
            res.status(200).send(purchases);
        }
        catch (error) {
            res.status(400).send({
                message: "Fail to get purchases",
                error: error.message,
            });
        }
    });
}
exports.getPurchasesByUserId = getPurchasesByUserId;
