const express = require("express")
const UserController = require("./controller/usercontroller");
const app =express()
app.use(express.json());
app.use("/users", UserController)

module.exports=app