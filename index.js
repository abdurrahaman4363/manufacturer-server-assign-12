const express = require('express')
const { MongoClient, ServerApiVersion } = require('mongodb');
const cors = require('cors');
require('dotenv').config();
const app = express()
const port = process.env.PORT || 5000

// middleware  manufacturer_tools   H9T4M!34jyx-Pjy
app.use(cors());
app.use(express.json());




const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.g84sa.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
/* 
client.connect(err => {
  const collection = client.db("test").collection("devices");
  console.log('Mongodb is Connected')
  // perform actions on the collection object
  client.close();
});
 */

async function run(){
    try{
       
        await client.connect();
        console.log('Mongodb is Connected');
    }
    finally{

    }

}
run().catch(console.dir);

app.get('/', (req, res) => {
  res.send('manufacturer web server is running')
})

app.listen(port, () => {
  console.log(`manufacturer listening on port ${port}`)
})