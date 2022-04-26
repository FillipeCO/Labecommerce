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
exports.createUser = void 0;
const connection_1 = require("../data/connection");
function createUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { name, email, password } = req.body;
            const id = Date.now().toString();
            if (!name || !email || !password) {
                res
                    .status(400)
                    .send({ message: "Missing fields, Name, Email or Password" });
                return;
            }
            else if (password.length < 6) {
                res
                    .status(400)
                    .send({ message: "Password must have at least 6 characters" });
                return;
            }
            const user = yield connection_1.connection
                .insert({
                id,
                name,
                email,
                password,
            })
                .into("labecommerce_users");
            res.status(200).send({
                message: "User created!",
            });
        }
        catch (error) {
            res.status(400).send({
                message: "Fail to create user",
                error: error.message,
            });
        }
    });
}
exports.createUser = createUser;
