import express, { Request, Response } from 'express';
import { fillDataForSingleProduct, fillDataForManyProduct } from '../functions/aiHandler';

const aiRoute : express.Router = express.Router();

aiRoute.post("/fillproductdatawithimg", async (req : express.Request, res : express.Response) : Promise<void> => { 
    try {
        let img : string = req.body.img;
        
        let aiJson = await fillDataForSingleProduct(img);

        res.status(200).json(aiJson);

    } catch (e : any) {
        res.status(404).json({ "error" : `error fetching: ${e}` });
    }
});

aiRoute.post("/fillmanyproductdatawithimg", async (req : express.Request, res : express.Response) : Promise<void> => { 
    try {
        let img : string = req.body.img;
        let aiJson = await fillDataForManyProduct(img);

        res.status(200).json(aiJson);

    } catch (e : any) {
        res.status(404).json({ "error" : `error fetching: ${e}` });
    }
});

export default aiRoute;