import { MongoClient } from 'mongodb'; //imports mongo db
const url = process.env.MONGODB_URI || `mongodb://localhost:27017/organizer`; //set url for db
let db = null; //db connection var

export async function connectDB() { //connect to database function,
    if (db) return db; //client = connection
    let client = await MongoClient.connect(url, { useNewUrlParser: true }); //pass url and arg use new url
    db = client.db(); //db = connected db defined db
    return db;
}

// connectDB();