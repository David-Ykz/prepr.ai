import dotenv from 'dotenv';
dotenv.config();
import { MongoClient, ServerApiVersion } from 'mongodb';
const client = new MongoClient(process.env.MONGODB_CONNECTION_STRING, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

export async function pingMongoCluster() {
	try {
	    await client.connect();
	    await client.db("admin").command({ ping: 1 });
    	console.log("Pinged your deployment. You successfully connected to MongoDB!");
  	} finally {
	    await client.close();
  	}
}

export async function storeJobPosting(data) {
	try {
		await client.connect();
		const db = client.db(process.env.MONGODB_DBNAME);
		const collection = db.collection(process.env.MONGODB_COLLECTION);
		return await collection.insertOne(data);
	} catch(err) {
		console.error("Error storing job posting: ", err);
	} finally {
		await client.close();
	}
}