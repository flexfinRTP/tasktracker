import { MongoClient } from 'mongodb';
import path from 'path';

import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser'; //alows post requests

import './initialize';
import { authenticationRoute } from './auth'

import { connectDB } from './connect'
import { addNewTask, updateTask } from './communicate';


let port = process.env.PORT || 7777; //port can be any port # not used
let app = express();

app.use(
    cors(),
    bodyParser.urlencoded({extended:true}), //able to use posts reqs
    bodyParser.json() //able to use posts req
);
app.listen(port,console.info("Server running, listening on port ", port)); //listen to port

// app.get('/', (req,res)=>{ //request param, response
//     res.send("Hello World!");//when wanting to respond to something, send() whatever you want to server
// });

authenticationRoute(app);

if (process.env.NODE_ENV == `production`) {
    app.use(express.static(path.resolve(__dirname,'../../dist')));
    app.get('/*',(req,res)=>{
        res.sendFile(path.resolve('index.html'));
    });
}

//post requests

app.post('/task/new',async (req,res)=>{
    // let task = req.body.task; //body=data passed in with http request
    await addNewTask(req.body.task); 
    res.status(200).send(); //200 code = status is ok
});

app.post('/task/update',async (req,res)=>{
    let db = await connectDB();
    await updateTask(req.body.task);
    res.status(200).send(); //200 code = status is ok
});

app.post('/comment/new',async (req,res)=>{
    let comment = req.body.comment;
    let db = await connectDB();
    let collection = db.collection(`comments`);
    await collection.insertOne(comment);
    res.status(200).send(); //200 code = status is ok
});