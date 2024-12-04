require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const userRoutes = require('./src/routes/userRoutes.js');
const productRoutes = require('./src/routes/productRoutes.js');
const connectdb=require("./src/config/dbconfig.js")
const cors = require('cors');

const app = express();
const PORT=process.env.PORT||3000
// Middleware
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
// Routes
app.use("/user",userRoutes)
app.use("/product",productRoutes)

connectdb()
app.listen(PORT,()=>{console.log("server is running on port ",PORT)})
