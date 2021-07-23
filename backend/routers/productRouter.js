import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import Product from '../models/productModel.js';
import data from '../data.js'

const productRouter = express.Router();

/*
    Things to add:
        - post function (isAdmin middleware) to post new products from a frontend form
        - delete function (isAdmin) to delete products
*/

productRouter.get('/', expressAsyncHandler(async (req, res) => {
    const products = await Product.find({});
    res.send(products);
}));

productRouter.get('/seed', expressAsyncHandler(async (req, res) => {
    // await Product.deleteMany({});
    const createdProducts = await Product.insertMany(data.products);
    res.send({createdProducts});
}));


productRouter.get('/:id', expressAsyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);
    if (product) {
        res.send(product);
    } else {
        res.status(404).send({message:'Product not Found'});
    }
}));

export default productRouter;