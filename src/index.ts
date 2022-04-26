import app from "./app"
import {createUser} from "./endpoints/createUser"
import {getAllUsers} from "./endpoints/getAllUsers"
import {getAllProducts} from "./endpoints/getAllProducts"
import {createProduct} from "./endpoints/createProduct"
import {createPurchase} from "./endpoints/createPurchase"
import {getPurchasesByUserId} from "./endpoints/getPurchasesByUserId"
import {getAllProductsDesafio} from "./endpoints/getAllProducts"
import {getAllUsersDesafio} from "./endpoints/getAllUsers"

app.get("/users", getAllUsers)

app.post("/users", createUser)

app.get("/products", getAllProducts)

app.post("/products", createProduct)

app.post("/purchases", createPurchase)

app.get("/purchases/:user_id", getPurchasesByUserId)

app.get("/productsDesafio", getAllProductsDesafio)

app.get("/usersDesafio", getAllUsersDesafio)