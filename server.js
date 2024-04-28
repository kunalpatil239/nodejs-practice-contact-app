const express = require("express");
const dotenv = require("dotenv").config()
const contactRoutes = require("./routes/contactRoutes");
const userRoutes = require("./routes/userRoutes");
const errorHandler = require("./middleware/errorHandler");
const connectDb = require("./config/dbConnection");

const app = express();

const port = process.env.PORT || 3000

app.use(express.json())
app.use("/api/contacts",contactRoutes)
app.use("/api/users",userRoutes)
app.use(errorHandler)

app.listen(port,()=>{
    connectDb()
    console.log(`server running on ${port}`);
})