const mongoose = require("mongoose")

const productSchema =  new mongoose.Schema({
    name : {
        type : String
    },
    price : {
        type : String
    },
    userId : {
        type : String
    }
    ,
    category : {
        type : String
    }
    ,
    company : {
        type : String
    }
})

module.exports = mongoose.model('product',productSchema)