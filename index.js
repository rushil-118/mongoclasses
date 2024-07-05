const express = require('express');
const mongoose = require('mongoose');


mongoose.connect('mongodb+srv://root:rushil12@cluster0.pz1htkb.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0').then(()=>{
    console.log("DB Connected")
}).catch((err) => {
    console.log("Error", err);
});

const productSchema = new mongoose.Schema({
    product_name : {
        type : String,
        required : true
    },
    product_price : {
        type : String,
        required : true
    },
    isInStock : {
        type : Boolean,
        required : true
    },
    category : {
        type : String,
        required : true
    }
});

const productModel = mongoose.model('products', productSchema);

const app = express();
app.use(express.json());

app.post('/products', async(req, res) => {
    const body = req.body;
    const product = productModel.create({
        product_name : body.product_name,
        product_price : body.product_price,
        isInStock : body.isInStock,
        category : body.category
    });

    console.log(product.then((data) => {
        console.log(data);
    }).catch((err) => {
        console.log("failedd", err);
    }));

    return res.status(201).json({message : 'Product Created'});
});

app.listen(8088, ()=>{
    console.log("server");
});