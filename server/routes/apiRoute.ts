import express from 'express';
import productsModel, { Product, ProductsData } from '../dbModels/products';
import reserveListModel from '../dbModels/completedReserveList';
import userModel from '../dbModels/users';

const productsModule = productsModel();
const reserveListModule = reserveListModel();
const userModule = userModel();

const apiRoute : express.Router = express.Router();

apiRoute.get("/", async (req : express.Request, res : express.Response) : Promise<void> => { 
    try {

        res.status(200).json({ "message" : "apiroute initialized"});

    } catch (e : any) {
        res.status(404).json({ "error" : `error fetching: ${e}` });
    }
});

apiRoute.post("/fetchOneEmail", async (req : express.Request, res : express.Response) : Promise<void> => { 
    try {
        if(req.body.username){
            let username : string = req.body.username;
            let result : string = await userModule.fetchOneEmailWithName(username);
            res.status(200).json(result);
        }
        else{
            res.status(404).json({ "error" : `invalid input` });
        }

    } catch (e : any) {
        res.status(404).json({ "error" : `error fetching: ${e}` });
    }
});

apiRoute.post("/fetchSellerProducts", async (req : express.Request, res : express.Response) : Promise<void> => { 
    try {
        if(req.body.username){
            let username : string = req.body.username;
            let result = await productsModule.fetchOneWithName(username);
            res.status(200).json(result);
        }
        else{
            res.status(404).json({ "error" : `invalid input` });
        }

    } catch (e : any) {
        res.status(404).json({ "error" : `error fetching: ${e}` });
    }
});

apiRoute.post("/addProducts", async (req : express.Request, res : express.Response) : Promise<void> => { 
    try {
        if(req.body.username && req.body.products){
            let username : string = req.body.username;
            let products : Product[] = req.body.products;
            let newDbDataCell : ProductsData = {
                username: username,
                products: products
            }
            let result = await productsModule.addData(newDbDataCell);
            res.status(200).json(result);
        }
        else{
            res.status(404).json({ "error" : `invalid input` });
        }

    } catch (e : any) {
        res.status(404).json({ "error" : `error fetching: ${e}` });
    }
});

apiRoute.post("/deleteProduct", async (req : express.Request, res : express.Response) : Promise<void> => { 
    try {
        if(req.body.username && req.body.productToDelete){
            let username : string = req.body.username;
            let productToDelete : Product = req.body.productToDelete;
            let result = await productsModule.deleteProduct(username, productToDelete);
            res.status(200).json(result);
        }
        else{
            res.status(404).json({ "error" : `invalid input` });
        }
        
    } catch (e : any) {
        res.status(404).json({ "error" : `error fetching: ${e}` });
    }
});

apiRoute.post("/fetchBuyerReservedProducts", async (req : express.Request, res : express.Response) : Promise<void> => { 
    try {
        if(req.body.username){
            let username : string = req.body.username;
            let result = await productsModule.findProductsByReserver(username);
            res.status(200).json(result);
        }
        else{
            res.status(404).json({ "error" : `invalid input` });
        }
        
    } catch (e : any) {
        res.status(404).json({ "error" : `error fetching: ${e}` });
    }
});

apiRoute.post("/fetchMatchingProdsByCategory", async (req : express.Request, res : express.Response) : Promise<void> => { 
    try {
        if(req.body.categories){
            let categories : string[] = req.body.categories;
            let result = await productsModule.fetchProductsByCategories(categories);
            res.status(200).json(result);
        }
        else{
            res.status(404).json({ "error" : `invalid input` });
        }
        
    } catch (e : any) {
        res.status(404).json({ "error" : `error fetching: ${e}` });
    }
});

apiRoute.post("/fetchRandomProducts", async (req : express.Request, res : express.Response) : Promise<void> => { 
    try {

        let result = await productsModule.fetchRandomDocuments();
        res.status(200).json(result);
        
    } catch (e : any) {
        res.status(404).json({ "error" : `error fetching: ${e}` });
    }
});

apiRoute.post("/fetchMatchingProdsByKeywords", async (req : express.Request, res : express.Response) : Promise<void> => { 
    try {
        if(req.body.keywords){
            let keywords : string[] = req.body.keywords;
            let result = await productsModule.fetchProductsByKeywords(keywords);
            res.status(200).json(result);
        }
        else{
            res.status(404).json({ "error" : `invalid input` });
        }
        
    } catch (e : any) {
        res.status(404).json({ "error" : `error fetching: ${e}` });
    }
});

apiRoute.post("/addReserver", async (req : express.Request, res : express.Response) : Promise<void> => { 
    try {
        if(req.body.username && req.body.reserver && req.body.product){
            let username : string = req.body.username;
            let reserver : string = req.body.reserver;
            let product : Product = req.body.product;
            let result = await productsModule.addOrEditReserver(username, product, reserver);
            res.status(200).json(result);
        }
        else{
            res.status(404).json({ "error" : `invalid input` });
        }
        
    } catch (e : any) {
        res.status(404).json({ "error" : `error fetching: ${e}` });
    }
});

apiRoute.post("/acceptReservation", async (req : express.Request, res : express.Response) : Promise<void> => { 
    try {
        if(req.body.username && req.body.reserver && req.body.product){
            let username : string = req.body.username;
            let reserver : string = req.body.reserver;
            let product : Product = req.body.product;
            let result = await productsModule.acceptReserver(username, product, reserver);
            res.status(200).json(result);
        }
        else{
            res.status(404).json({ "error" : `invalid input` });
        }
        
    } catch (e : any) {
        res.status(404).json({ "error" : `error fetching: ${e}` });
    }
});

apiRoute.post("/fetchOpenReservations", async (req : express.Request, res : express.Response) : Promise<void> => { 
    try {
        if(req.body.username){
            let username : string = req.body.username;
            let result = await productsModule.fetchProductsAndReservers(username);
            res.status(200).json(result);
        }
        else{
            res.status(404).json({ "error" : `invalid input` });
        }
        
    } catch (e : any) {
        res.status(404).json({ "error" : `error fetching: ${e}` });
    }
});

export default apiRoute;