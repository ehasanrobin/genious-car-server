const express = require('express')
const app = express()
const port = process.env.PORT || 5000;
const cors = require('cors');
const bodyParser = require("body-parser");
const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config()
var ObjectId = require('mongodb').ObjectId; 
app.use(cors());
app.use(bodyParser.json());
// carUser1
// 1gOsjtH6obb2AP1z


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.jspzohs.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run(){
  try{
      
      const serviceCollection = client.db("geniousCar").collection("service");

      app.get("/service",async(req,res)=> {
        const query = {};
        const cursor = serviceCollection.find(query);
        const services = await cursor.toArray();
        res.send(services)
      })
      app.get("/service/:id",async(req,res)=> {
        id = req.params.id;
        const query = {_id : ObjectId(id)}
        const result = await serviceCollection.findOne(query);
        res.send(result);
      })
      // post 
      app.post("/service",async(req,res)=> {
        const newUser = req.body;
        const result = await serviceCollection.insertOne(newUser);
        res.send(result);
        
      })
      // delete 
      app.delete("/service/:id",async(req,res)=> {
        const id = req.params.id;
        const query = {_id : ObjectId(id)}
        const result = await serviceCollection.deleteOne(query);
        res.send(result);
        
      })
  }
  finally{

  }
}
run().catch(console.dir)

app.listen(port, () => {
  
})
