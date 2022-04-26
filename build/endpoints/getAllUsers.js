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
exports.getAllUsersDesafio = exports.getAllUsers = void 0;
const connection_1 = require("../data/connection");
function getAllUsers(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const users = yield connection_1.connection
                .select("id", "name", "email")
                .from("labecommerce_users");
            res.status(200).send(users);
        }
        catch (error) {
            res.status(400).send({
                message: "Falha ao buscar usuários",
                error: error.message,
            });
        }
    });
}
exports.getAllUsers = getAllUsers;
function getAllUsersDesafio(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const user = yield connection_1.connection
                .select("id", "name", "email")
                .from("labecommerce_users");
            const purchases = yield connection_1.connection
                .select("*")
                .from("labecommerce_purchases");
            const usersWithPurchases = user.map((user) => {
                const userPurchases = purchases.filter((purchase) => purchase.user_id === user.id);
                return Object.assign(Object.assign({}, user), { purchases: userPurchases });
            });
            res.status(200).send(usersWithPurchases);
        }
        catch (error) {
            res.status(400).send({
                message: "Falha ao buscar usuários",
                error: error.message,
            });
        }
    });
}
exports.getAllUsersDesafio = getAllUsersDesafio;
