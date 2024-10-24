import { MongoClient } from 'mongodb';

export interface UserData {
    username: string,
    password: string,
    bio: string,
    email: string
}

const userModel = () => {
    const url : string = process.env.MONGO_ATLAS_URI ?? "";
    // const client = new MongoClient(url);
    const client = new MongoClient(url, { maxPoolSize: 5, maxIdleTimeMS: 10000 }); //reduce the amount of connections

    const dbName = 'matskumestaData';

    const collection = `userCollection`;
    const db = client.db(dbName);
    const userCollection = db.collection(collection);

    client.connect().catch(error => {
        console.error('Failed to connect to MongoDB:', error);
    });

    //find one by id and return it as json
    const fetchOneWithName = async (username : string) => {
        try {
            const result = await userCollection.findOne({username : username});
            return result;
        } catch (error) {
            console.error('Conncetion to db failed code 88: ', error);
            throw error;
        } 
    }

    //find one by id and return it as json
    const fetchOneEmailWithName = async (username : string) => {
        try {
            const result = await userCollection.findOne({username : username});
            if (result){
                return result.email;
            }
            else{
                return "";
            }
        } catch (error) {
            console.error('Conncetion to db failed code 88: ', error);
            throw error;
        } 
    }

    //find one by email and return it as json
    const fetchOneWithEmail = async (email : string) => {
        try {
            const result = await userCollection.findOne({email : email});
            return result;
        } catch (error) {
            console.error('Conncetion to db failed code 88: ', error);
            throw error;
        } 
    }
    
    //find all data and return an array
    const fetchData = async () => {
        try {
            const result = await userCollection.find().toArray();
            return result;
        } catch (error) {
            console.error('Connection to test db failed with status code 101');
            throw error;
        } 
    }
    
    //add one datacell to document
    const addData = async (userData: UserData) => {
        try {
            const result = await userCollection.insertOne(userData);
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
        fetchOneWithEmail,
        fetchOneEmailWithName
        // Add more functions to export here
    };
}

export default userModel;