import { MongoClient } from 'mongodb';

export interface ReserveCell {
    productTitle: string,
    email: string
}

export interface ReserveData {
    username: string,
    reserveCell: ReserveCell[],
}

const reserveListModel = () => {
    const url : string = process.env.MONGO_ATLAS_URI ?? "";
    // const client = new MongoClient(url);
    const client = new MongoClient(url, { maxPoolSize: 5, maxIdleTimeMS: 10000 }); //reduce the amount of connections

    const dbName = 'matskumestaData';

    const collection = `reserveListCollection`;
    const db = client.db(dbName);
    const reserveListCollection = db.collection(collection);

    client.connect().catch(error => {
        console.error('Failed to connect to MongoDB:', error);
    });

    //find one by id and return it as json
    const fetchOneWithName = async (username : string) => {
        try {
            const result = await reserveListCollection.findOne({username : username});
            return result;
        } catch (error) {
            console.error('Conncetion to db failed code 88: ', error);
            throw error;
        } 
    }
    
    //find all data and return an array
    const fetchData = async () => {
        try {
            const result = await reserveListCollection.find().toArray();
            return result;
        } catch (error) {
            console.error('Connection to test db failed with status code 101');
            throw error;
        } 
    }
    
    //add one datacell to document
    const addData = async (userData: ReserveData) => {
        try {
            const result = await reserveListCollection.insertOne(userData);
            return result;
        } catch (error) {
            console.error('Connection to test db failed with status code 102');
            throw error;
        } 
    }

    return {
        fetchData,
        addData,
        fetchOneWithName,
        // Add more functions to export here
    };
}

export default reserveListModel;