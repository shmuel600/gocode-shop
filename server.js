import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(express.static('client/build'));
dotenv.config();
app.use(cors());
const { DB_USER, DB_PASS, DB_HOST, DB_NAME } = process.env;
const PORT = process.env.PORT || 8000;

const Product = mongoose.model("Product", {
    id: Number,
    title: String,
    price: Number,
    description: String,
    category: String,
    image: String,
    rating: {
        rate: Number,
        count: Number
    }
});

app.get("/api/products", (request, response) => { //return all products
    Product
        .find()
        .then((products) => {
            const { title } = request.query;
            if (title) {
                const filteredProducts = products.filter((product) =>
                    product.title.toLowerCase().includes(title.toLowerCase())
                );
                response.send(filteredProducts);
            }
            else {
                response.send(products);
            }
        })
        .catch((error) => console.log("catch", error));
})
app.get("/api/products/:id", (request, response) => { //return a specific product
    const { id } = request.params;
    Product.findById(id)
        .then((product) => {
            product ?
                response.send(product) :
                response.send("not found");
        })
        .catch((error) => console.log(error));
})
app.post("/api/products", (request, response) => {  //create a new product
    const { title, price, description, category, image, rate, count } = request.body;
    Product
        .find()
        .then((products) => {
            const maxId = Math.max(...products.map((product) => product.id));
            const id = maxId >= 0 ? (maxId + 1) : 1;
            Product
                .insertMany([{
                    id,
                    title,
                    price,
                    description,
                    category,
                    image,
                    rating: {
                        rate,
                        count
                    }
                }])
                .then((product) => response.send(product))
                .catch((error) => console.log(error));
        })
        .catch((error) => console.log(error));
})
app.patch("/api/products/:id", (request, response) => {  //edit product
    Product.findByIdAndUpdate(request.params.id, request.body)
        .then((product) => {
            response.send(product);
        })
        .catch((error) => console.log(error));
})
app.delete("/api/products/:id", (request, response) => {  //delete product
    Product.findByIdAndRemove(request.params.id, request.body)
        .then((product) => {
            response.send(product);
        })
        .catch((error) => console.log(error));
})
app.get('*', (request, response) => { //direct other requests to client
    response.sendFile(__dirname + '/client/build/index.html');
});

mongoose.connect(`mongodb+srv://${DB_USER}:${DB_PASS}@${DB_HOST}/${DB_NAME}`).then(() => {
    console.log(`Listening on port ${PORT}`)
    app.listen(PORT)
});