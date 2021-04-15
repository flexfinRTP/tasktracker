import { connectDB } from './connect'

export const addNewTask = async task => {
    let db = await connectDB();
    let collection = db.collection(`tasks`);
    await collection.insertOne(task);
};

export const updateTask = async task => {
    let { id, group, isComplete, name } = task;
    let db = await connectDB();
    let collection = db.collection(`tasks`);
    if (group) {
        await collection.updateOne({ id }, { $set: { group } }); //find props (id), whatver is "set" to the group find it
    }
    if (name) {
        await collection.updateOne({ id }, { $set: { name } }); //find props (id), whatver is "set" to the name find it
    }
    if (isComplete !== undefined) { 
        await collection.updateOne({ id }, { $set: { isComplete } }); //find props (id), whatver is "set" to the isComplete find it
    }
};