import dotenv from 'dotenv';
dotenv.config();
import { MongoClient, ObjectId, ServerApiVersion } from 'mongodb';
const client = new MongoClient(process.env.MONGODB_CONNECTION_STRING, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

export async function pingMongoCluster() {
	await client.connect();
	await client.db("admin").command({ ping: 1 });
	console.log("Pinged your deployment. You successfully connected to MongoDB!");
}

export async function storeJobPosting(data) {
	try {
		await client.connect();
		const db = client.db(process.env.MONGODB_DBNAME);
		const collection = db.collection(process.env.MONGODB_COLLECTION);
		return await collection.insertOne(data);
	} catch (err) {
		console.error("Error storing job posting: ", err);
	}
}

export async function getJobPosting(id) {
    try {
        await client.connect();
        const db = client.db(process.env.MONGODB_DBNAME);
        const collection = db.collection(process.env.MONGODB_COLLECTION);
        return await collection.findOne(ObjectId.createFromHexString(id));
    } catch (err) {
		console.error(`Error getting job posting with id ${id}: `, err);
		return {};
    }
}

export async function listJobPosting(title, company, tags) {
	try {
        await client.connect();
        const db = client.db(process.env.MONGODB_DBNAME);
        const collection = db.collection(process.env.MONGODB_COLLECTION);
		const filters = {};
		if (title != "") {
			filters.title = { $regex: title, $options: 'i'};
		}
		if (company != "") {
			filters.company = { $regex: company, $options: 'i'};
		}
		if (tags.length != 0) {
			filters.tags = { $all: tags };
		}
		return await collection.find(filters).toArray();
    } catch (err) {
		console.error("Error listing job postings: ", err);
		return [];
    }
}