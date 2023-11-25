const express = require('express');
const app = express();
// const user = require('../back-end/models/user.model');
// const product = require('../back-end/models/product.model');
const port = 3001;
const cors = require('cors');
const userRoute = require('../back-end/routes/user-route')
const productRoute = require('../back-end/routes/product-route')
app.use('/',userRoute)
app.use('/',productRoute)
app.use(express.json())
require('mongoose')
app.use(cors())
require('./db/db')
app.listen(port)

console.log("server is running on port ", port)



