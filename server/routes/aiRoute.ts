import express, { Request, Response } from 'express';

const aiRoute : express.Router = express.Router();

aiRoute.get("/", async (req : express.Request, res : express.Response) : Promise<void> => { 
    try {

        res.status(200).json({ "Message: " : "Airoute initialized"});

    } catch (e : any) {
        res.status(404).json({ "error" : `error fetching: ${e}` });
    }
});

export default aiRoute;