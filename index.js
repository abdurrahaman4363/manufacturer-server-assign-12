const express = require('express')
const { MongoClient, ServerApiVersion } = require('mongodb');
const cors = require('cors');
const jwt = require('jsonwebtoken')
require('dotenv').config();
const app = express()
const port = process.env.PORT || 5000

// middleware  manufacturer_tools   H9T4M!34jyx-Pjy
app.use(cors());
app.use(express.json());

////////////////////
function verifyJWT(req, res, next) {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.status(401).send({ message: 'Unauthorized access' });
    }
    const token = authHeader.split(' ')[1];
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, function (err, decoded) {
        if (err) {
            return res.status(403).send({ message: 'Forbidden access' });
        }
        req.decoded = decoded;
        next();
    });
}
////////////////////////



const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.g84sa.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });


async function run(){
    try{
       
        await client.connect();
        console.log('Mongodb is Connected');
        const toolCollection = client.db('agriculture_manufacturer').collection('tools');
        const reviewCollection = client.db('agriculture_manufacturer').collection('reviews');

/////////////////////////
        const verifyAdmin = async (req, res, next) => {
            const requester = req.decoded.email;
            const requesterAccount = await userCollection.findOne({ email: requester });
            if (requesterAccount.role === 'admin') {
                next()
            }
            else {
                res.status(403).send({ message: 'Forbidden' });
            }
        }
//////////////////////////

        app.get('/tool', async(req, res) =>{
            const query = {};
            const cursor = toolCollection.find(query);
            const tools = await cursor.toArray();
            res.send(tools);
        })
////////////////////////////////
        app.post('/review', async (req, res) => {
            const review = req.body;
            const result = await reviewCollection.insertOne(review);
            res.send(result);
        })
/////////////////////////////////
        app.get('/review', async(req, res) =>{
            const review = await reviewCollection.find().toArray();
            res.send(review)

        })
        /////////////////////////////
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