"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const createUser_1 = require("./endpoints/createUser");
const getAllUsers_1 = require("./endpoints/getAllUsers");
const getAllProducts_1 = require("./endpoints/getAllProducts");
const createProduct_1 = require("./endpoints/createProduct");
const createPurchase_1 = require("./endpoints/createPurchase");
const getPurchasesByUserId_1 = require("./endpoints/getPurchasesByUserId");
const getAllProducts_2 = require("./endpoints/getAllProducts");
const getAllUsers_2 = require("./endpoints/getAllUsers");
app_1.default.get("/users", getAllUsers_1.getAllUsers);
app_1.default.post("/users", createUser_1.createUser);
app_1.default.get("/products", getAllProducts_1.getAllProducts);
app_1.default.post("/products", createProduct_1.createProduct);
app_1.default.post("/purchases", createPurchase_1.createPurchase);
app_1.default.get("/purchases/:user_id", getPurchasesByUserId_1.getPurchasesByUserId);
app_1.default.get("/productsDesafio", getAllProducts_2.getAllProductsDesafio);
app_1.default.get("/usersDesafio", getAllUsers_2.getAllUsersDesafio);
