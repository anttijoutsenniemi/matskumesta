import express from 'express';
import productsModel, { Product, ProductsData } from '../dbModels/products';

const productsModule = productsModel();

const apiRoute : express.Router = express.Router();

apiRoute.get("/", async (req : express.Request, res : express.Response) : Promise<void> => { 
    try {

        res.status(200).json({ "message" : "apiroute initialized"});

    } catch (e : any) {
        res.status(404).json({ "error" : `error fetching: ${e}` });
    }
});

apiRoute.post("/addProducts", async (req : express.Request, res : express.Response) : Promise<void> => { 
    try {
        let username : string = req.body.username;
        let products : Product[] = req.body.products;
        let newDbDataCell : ProductsData = {
            username: username,
            products: products
        }
        productsModule.addData(newDbDataCell);
        res.status(200).json({ "message" : "apiroute initialized"});

    } catch (e : any) {
        res.status(404).json({ "error" : `error fetching: ${e}` });
    }
});

export default apiRoute;