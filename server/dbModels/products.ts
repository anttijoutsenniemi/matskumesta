import { MongoClient, Collection, Document } from 'mongodb';

export interface Reserver {
    reserver: string;
    accepted: boolean;
}

export interface Product {
    id: number;
    title: string;
    description: string;
    image: string;
    color: string;
    price?: string;
    categories?: string[],
    reservers?: Reserver[],
    amount?: string;
    weight?: string;
    quality?: string;
    location?: string;
    packaging?: string;
    availability?: string;
}

export interface ProductsData {
    username: string,
    products: Product[]
}

interface ProductsDocument extends Document {
    username: string;
    products: Product[];
}

const productsModel = () => {
    const url : string = process.env.MONGO_ATLAS_URI ?? "";
    // const client = new MongoClient(url);
    const client = new MongoClient(url, { maxPoolSize: 5, maxIdleTimeMS: 10000 }); //reduce the amount of connections

    const dbName = 'matskumestaData';

    const collection = `productsCollection`;
    const db = client.db(dbName);
    const productsCollection = db.collection(collection);

    client.connect().catch(error => {
        console.error('Failed to connect to MongoDB:', error);
    });

    //find one by id and return it as json
    const fetchOneWithName = async (username : string) => {
        try {
            const result = await productsCollection.findOne({username : username});
            return result;
        } catch (error) {
            console.error('Conncetion to db failed code 88: ');
            throw error;
        } 
    }
    
    //find all data and return an array
    const fetchData = async () => {
        try {
            const result = await productsCollection.find().toArray();
            return result;
        } catch (error) {
            console.error('Connection to test db failed with status code 101');
            throw error;
        } 
    }
    
    //add one datacell to document
    // const addData = async (productsData: ProductsData) => {
    //     try {
    //         let username : string = productsData.username;
    //         const result = await productsCollection.insertOne(productsData);
    //         return result;
    //     } catch (error) {
    //         console.error('Connection to test db failed with status code 102');
    //         throw error;
    //     } 
    // }

    // Add or update data in the collection
    const addData = async (productsData: ProductsData) => {
        try {
          const { username, products } = productsData;
      
          // Check if a document exists with the matching username
          const existingDocument = await productsCollection.findOne({ username });
      
          if (existingDocument) {
            // Append the new products to the existing products array
            const updatedProducts = [...existingDocument.products, ...products];
      
            // Update the existing document with the merged products
            await productsCollection.updateOne(
              { username },
              { $set: { products: updatedProducts } }
            );
      
            //fetch the updated document and return it
            const updatedDocument = await productsCollection.findOne({ username });
            return { ok: 'Document updated successfully', document: updatedDocument };
          } else {
            // Insert new document if none exists
            await productsCollection.insertOne(productsData);

            //fetch the updated document and return it
            const updatedDocument = await productsCollection.findOne({ username });
            return { ok: 'Document inserted successfully', document: updatedDocument };
          }
        } catch (error) {
          console.error('Connection to test db failed with status code 102', error);
          throw error;
        }
    };

    // Function to delete a matching product from a user's document
    const deleteProduct = async (username: string, productToDelete: Product) => {
        try {
        // Find the document with the matching username
        const existingDocument = await productsCollection.findOne({ username });
    
        if (!existingDocument) {
            return { error: 'Document not found for the given username' };
        }
    
        // Filter out the matching product from the products array
        const updatedProducts = existingDocument.products.filter((product : Product) => {
            // Check all fields to match the product exactly
            return !(
            product.title === productToDelete.title &&
            product.description === productToDelete.description
            );
        });
    
        // Update the document with the modified products array
        await productsCollection.updateOne(
            { username },
            { $set: { products: updatedProducts } }
        );
    
        //fetch the updated document and return it
        const updatedDocument = await productsCollection.findOne({ username });
        return { ok: 'Product deleted successfully', document: updatedDocument };
        } catch (error) {
        console.error('Failed to delete product with status code 102', error);
        throw error;
        }
    };

    // Function to add or edit a reserveuser in the reservers array of a product
    const addOrEditReserver = async (username: string, productToEdit: Product, reserveuser: string) => {
        try {

            // Find the document with the matching username
            const existingDocument = await productsCollection.findOne({ username });

            if (!existingDocument) {
                return { error: 'Document not found for the given username' };
            }

            // Find the product to update within the products array
            const updatedProducts = existingDocument.products.map((product: Product) => {
                if (
                    product.title === productToEdit.title &&
                    product.description === productToEdit.description
                ) {
                    console.log("product found");
                    // Check if the reservers array exists, if not, initialize it
                    if (!product.reservers) {
                        product.reservers = [];
                    }

                    const reserverExists = product.reservers.some(
                        reserverObj => reserverObj.reserver === reserveuser
                    );
                    
                    // Add the reserveuser if it doesn't already exist in the reservers array
                    if (!reserverExists) {
                        product.reservers.push({ reserver: reserveuser, accepted: false });
                        product.color = "green";
                    }
                }

                return product;
            });

            // Update the document with the modified products array
            await productsCollection.updateOne(
                { username },
                { $set: { products: updatedProducts } }
            );

            // Fetch the updated document and return it
            const updatedDocument = await productsCollection.findOne({ username });
            return { ok: 'Reserver added or updated successfully', document: updatedDocument };
        } catch (error) {
            console.error('Failed to add or edit reserver with status code 102', error);
            throw error;
        }
    };

    // Function to set a specific reserver's accepted value to true
    const acceptReserver = async (username : string, productToEdit : Product, reserverToAccept : string) => {
        try {
            // Find the document with the matching username
            const existingDocument = await productsCollection.findOne({ username });

            if (!existingDocument) {
                return { error: 'Document not found for the given username' };
            }

            // Map through products to find and update the specific product
            const updatedProducts = existingDocument.products.map((product : Product) => {
                // Check if this is the product we want to update by comparing properties
                if (
                    product.title === productToEdit.title &&
                    product.description === productToEdit.description
                ) {
                    console.log("product found");

                    // Check if the reservers array exists
                    if (product.reservers) {
                        // Find and update the specific reserver's accepted value
                        product.reservers = product.reservers.map((reserverObj) => {
                            if (reserverObj.reserver === reserverToAccept) {
                                return { ...reserverObj, accepted: true };
                            }
                            return reserverObj;
                        });
                    }
                }
                return product;
            });

            // Update the document with the modified products array
            await productsCollection.updateOne(
                { username },
                { $set: { products: updatedProducts } }
            );

            // Fetch the updated document and return it
            const updatedDocument = await productsCollection.findOne({ username });
            return { ok: 'Reserver accepted successfully', document: updatedDocument };
        } catch (error) {
            console.error('Failed to accept reserver with status code 103', error);
            throw error;
        }
    };


    // Function to find all products where a given reserveuser is found
    const findProductsByReserver = async (reserveuser: string) => {
        try {
            // Modify the query to look for a match within the reservers array objects
            const documentsWithReserver = await productsCollection.find({
                "products": {
                    $elemMatch: {
                        reservers: {
                            $elemMatch: {
                                reserver: reserveuser
                            }
                        }
                    }
                }
            }).toArray();
    
            if (documentsWithReserver.length === 0) {
                return { error: 'No products found for the given reserveuser' };
            }
    
            // Filter out only the products where the reserveuser is found in the reservers array
            const productsWithReserver = documentsWithReserver.map(document => {
                return {
                    username: document.username,
                    products: document.products.filter((product: Product) => 
                        product.reservers && product.reservers.some(reserverObj => reserverObj.reserver === reserveuser)
                    )
                };
            });
    
            return { ok: 'Products found successfully', document: productsWithReserver };
        } catch (error) {
            console.error('Failed to find products by reserveuser with status code 103', error);
            throw error;
        }
    };

    //fetch x random documents and return array
    const fetchRandomDocuments = async () => {
        try {
            const result = await productsCollection.aggregate([
                { $sample: { size: 6 } },  // Fetch up to 6 random documents
                { 
                    $project: {  // Only return username and products fields
                        _id: 0,  // Exclude the _id field
                        username: 1,
                        products: { $slice: ["$products", 3] }  // Limit products array to max 3 items
                    }
                }
            ]).toArray();  // Convert the cursor to an array
            return result;
        } catch (error) {
            console.error('Connection to db failed code 88: ', error);
            throw error;
        }
    }    

    const fetchProductsByCategories = async (categories: string[]) => {
        try {
            const result = await productsCollection.aggregate([
                {
                    $match: {
                        'products.categories': { $in: categories }  // Match documents with at least one product having the category
                    }
                },
                {
                    $project: {
                        _id: 0,  // Exclude _id
                        username: 1,  // Include username
                        products: {
                            $slice: [
                                {                                
                                    $filter: {
                                        input: "$products",
                                        as: "product",
                                        cond: { 
                                            $anyElementTrue: {
                                                $map: {
                                                    input: "$$product.categories",
                                                    as: "category",
                                                    in: { $in: ["$$category", categories] }  // Check if each product's category exists in the input categories
                                                }
                                            }
                                        }
                                    }
                                },
                                10 //Limit of x products per user
                            ]
                        }
                    }
                },
                {
                    $limit: 20 //Limit of x users
                }
            ]).toArray();
    
            if (result.length === 0) {
                console.log('No matching products found.');
            }
    
            return result;
        } catch (error) {
            console.error('Connection to db failed code 88:', error);
            throw error;
        }
    }

    const fetchProductsByKeywords = async (keywords: string[]) => {
        try {
            const result = await productsCollection.aggregate([
                {
                    $match: {
                        'products.keywords': { $in: keywords }  // Match documents with at least one product having the keyword
                    }
                },
                {
                    $project: {
                        _id: 0,  // Exclude _id
                        username: 1,  // Include username
                        products: {
                            $slice: [
                                {
                                    $filter: {
                                        input: "$products",
                                        as: "product",
                                        cond: { 
                                            $anyElementTrue: {
                                                $map: {
                                                    input: "$$product.keywords",
                                                    as: "keyword",
                                                    in: { $in: ["$$keyword", keywords] }  // Check if each product's keyword exists in the input categories
                                                }
                                            }
                                        }
                                    }
                                },
                                10 //Limit of x amount of products
                            ]
                        }
                    }
                },
                {
                    $limit: 20 //Limit of x users
                }
            ]).toArray();
    
            if (result.length === 0) {
                console.log('No matching products found.');
            }
    
            return result;
        } catch (error) {
            console.error('Connection to db failed code 88:', error);
            throw error;
        }
    }

    //fetches all products that have reservers by sellername and returns prodcut and reserver array
    const fetchProductsAndReservers = async (username: string) => {
        try {
            const result = await productsCollection.findOne({ username: username });
    
            if (!result) {
                console.error('No user found with the given username');
                return [];
            }
    
            // Extract products with reservers
            const productsWithReservers = result.products
                .filter((product : Product) => product.reservers && product.reservers.length > 0)
                .map((product : Product) => ({
                    productName: product.title,
                    reservers: product.reservers
                }));
    
            return productsWithReservers;
        } catch (error) {
            console.error('Connection to db failed code 88:');
            throw error;
        }
    };

    return {
        fetchData,
        addData,
        fetchOneWithName,
        deleteProduct,
        fetchProductsByCategories,
        fetchRandomDocuments,
        fetchProductsByKeywords,
        addOrEditReserver,
        findProductsByReserver,
        fetchProductsAndReservers,
        acceptReserver
        // Add more functions to export here
    };
}

export default productsModel;