const express = require('express')
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const cors = require('cors');
const jwt = require('jsonwebtoken')
require('dotenv').config();
const app = express()
const port = process.env.PORT || 5000

// middleware  manufacturer_tools   H9T4M!34jyx-Pjy
app.use(cors());
app.use(express.json());



const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.g84sa.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });


async function run() {
    try {

        await client.connect();
        console.log('Mongodb is Connected');
        const toolCollection = client.db('agriculture_manufacturer').collection('tools');
        const reviewCollection = client.db('agriculture_manufacturer').collection('reviews');
        const userCollection = client.db('agriculture_manufacturer').collection('users');
        const orderCollection = client.db('agriculture_manufacturer').collection('orders');
        


        app.put('/user/:email', async (req, res) => {
            const email = req.params.email;
            const user = req.body;
            const filter = { email: email };
            const options = { upsert: true };
            const updateDoc = {
                $set: user,
            };
            const result = await userCollection.updateOne(filter, updateDoc, options);
            const token = jwt.sign({ email: email }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1h' })
            res.send({ result, token });
        })

        ////////////////////////////////

        app.get('/tool', async (req, res) => {
            const query = {};
            const cursor = toolCollection.find(query);
            const tools = await cursor.toArray();
            res.send(tools);
        })
        /////////////////////////////////
        app.get('/tool/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const tool = await toolCollection.findOne(query);
            res.send(tool);
        })
        ////////////////////////////////
        app.post('/review', async (req, res) => {
            const review = req.body;
            const result = await reviewCollection.insertOne(review);
            res.send(result);
        })
        /////////////////////////////////
        app.get('/review', async (req, res) => {
            const review = await reviewCollection.find().toArray();
            res.send(review)

        })
        /////////////////////////////
        app.post('/order', async (req, res) => {
            const review = req.body;
            const result = await orderCollection.insertOne(review);
            res.send(result);
        })
        /////////////////////////////
        app.get('/order', async (req, res) => {
            const email = req.query.email;
            const query = {email:email}
            const orders = await orderCollection.find(query).toArray();
            res.send(orders)

        })
        ////////////////////////////
    }
    finally {

    }

}
run().catch(console.dir);

app.get('/', (req, res) => {
    res.send('manufacturer web server is running')
})

app.listen(port, () => {
    console.log(`manufacturer listening on port ${port}`)
})