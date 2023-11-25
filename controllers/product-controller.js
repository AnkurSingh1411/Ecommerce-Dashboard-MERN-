const product = require('../models/product.model');


exports.addProduct = async(req,res)=>{
    const Product = new product(req.body)
    const savedProduct = await Product.save()
    res.send({
        message: "Product has been saved in db",
        data: savedProduct
    })
}

exports.getProduct = async (req, res) => {
    const Product = await product.find()
    if (Product.length > 0) {

        res.send(Product)
    }
    else {
        res.send({
            message: "Products not found"
        })
    }
}

exports.deleteProduct = async (req, res) => {
    const Product = await product.deleteOne({ _id: req.params.id })
    res.send(Product)
}

exports.getProductById =  async (req, res) => {
    const Product = await product.findOne({ _id: req.params.id })
    if (Product) {
        res.send(Product)
    }
    else {
        res.send("product is not there")
    }
}

exports.searchProduct = async (req, res) => {
    try {
        let result = await product.find({
            "$or": [
                { name: { $regex: req.params.key } },
                { price: { $regex: req.params.key } },
                { category: { $regex: req.params.key } }

            ]
        })
        res.send(result)
    } catch (e) {

        res.send(e.message)
    }
}

exports.updateProduct = async (req, res) => {
    const Product = await product.updateOne({ _id: req.params.id }, { $set: req.body })
    if (Product) {
        res.send(Product)
    }
    else {
        res.send("Something went wrong")
    }
}