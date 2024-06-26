// const express = require('express')
// const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
// const cors = require('cors');
// const jwt = require('jsonwebtoken')
// require('dotenv').config();
// const app = express()
// const port = process.env.PORT || 5000
// const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

// // middleware  manufacturer_tools   H9T4M!34jyx-Pjy
// app.use(cors());
// app.use(express.json());


// ////////////////////////////////
// function verifyJWT(req, res, next) {
//     const authHeader = req.headers.authorization;
//     if (!authHeader) {
//         return res.status(401).send({ message: 'Unauthorized access' });
//     }
//     const token = authHeader.split(' ')[1];
//     jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, function (err, decoded) {
//         if (err) {
//             return res.status(403).send({ message: 'Forbidden access' });
//         }
//         req.decoded = decoded;
//         next();
//     });
// }
// ///////////////////////////////



// const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.g84sa.mongodb.net/?retryWrites=true&w=majority`;
// const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });


// async function run() {
//     try {

//         await client.connect();
//         console.log('Mongodb is Connected');

//         const toolCollection = client.db('agriculture_manufacturer').collection('tools');
//         const reviewCollection = client.db('agriculture_manufacturer').collection('reviews');
//         const userCollection = client.db('agriculture_manufacturer').collection('users');
//         const orderCollection = client.db('agriculture_manufacturer').collection('orders');
//         const profileCollection = client.db('agriculture_manufacturer').collection('profiles');
        

//   /////////////////////////////////////

//        app.get('/user',verifyJWT, async(req, res) =>{
//         const users = await userCollection.find().toArray();
//         res.send(users);
//        })
//        /////////////////////////////

//   app.put('/user/admin/:email',verifyJWT, async (req, res) => {
//             const email = req.params.email;
//             const requester = req.decoded.email;
//             const requesterAccount = await userCollection.findOne({email:requester})
//             if(requesterAccount.role === 'admin'){
//                 const filter = { email: email };
//                 const updateDoc = {
//                     $set: {role:'admin'},
//                 };
//                 const result = await userCollection.updateOne(filter, updateDoc);
//                 res.send(result);
//             }
//             else{
//                 return res.status(403).send({ message: 'Forbidden access' }); 
//             }
           
//         })

//   ///////////////////////////////////
//         app.put('/user/:email', async (req, res) => {
//             const email = req.params.email;
//             const user = req.body;
//             const filter = { email: email };
//             const options = { upsert: true };
//             const updateDoc = {
//                 $set: user,
//             };
//             const result = await userCollection.updateOne(filter, updateDoc, options);
//             const token = jwt.sign({ email: email }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1h' })
//             res.send({ result, token });
//         })
//         //////////////////////////////////
//         app.get('/admin/:email', async (req, res) => {
//             const email = req.params.email;
//             const user = await userCollection.findOne({ email: email });
//             const isAdmin = user.role === 'admin';
//             res.send({ admin: isAdmin });
//         })

//         ////////////////////////////////

//         app.get('/tool', async (req, res) => {
//             const query = {};
//             const cursor = toolCollection.find(query);
//             const tools = await cursor.toArray();
//             res.send(tools);
//         })
//         ///////////////////////////////////
//         app.delete('/tool/:id', async (req, res) => {
//             const id = req.params.id;
//             const query = { _id: ObjectId(id) };
//             const result = await toolCollection.deleteOne(query);
//             res.send(result);
//         })

//         /////////////////////////////////
//         app.get('/tool/:id', async (req, res) => {
//             const id = req.params.id;
//             const query = { _id: ObjectId(id) };
//             const tool = await toolCollection.findOne(query);
//             res.send(tool);
//         })
//         ////////////////////////////
//         app.post('/tool', async (req, res) => {
//             const addItem = req.body;
//             const result = await toolCollection.insertOne(addItem);
//             res.send(result);
//         })
//         ////////////////////////////////
//         app.post('/review', async (req, res) => {
//             const review = req.body;
//             const result = await reviewCollection.insertOne(review);
//             res.send(result);
//         })
//         /////////////////////////////////
//         app.get('/review', async (req, res) => {
//             const review = await reviewCollection.find().toArray();
//             res.send(review)

//         })
//         /////////////////////////////
//         app.post('/order', async (req, res) => {
//             const review = req.body;
//             const result = await orderCollection.insertOne(review);
//             res.send(result);
//         })
//         /////////////////////////////////////////////

//         app.get('/order',verifyJWT, async (req, res) => {
//             const query = {};
//             const cursor = orderCollection.find(query);
//             const orders = await cursor.toArray();
//             res.send(orders);
//         })
       
//         /////////////////////////////
//         app.get('/order',verifyJWT, async (req, res) => {
//             const email = req.query.email;
//             const decodedEmail = req.decoded.email;
//             if(email === decodedEmail ){
//                 const query = {email:email}
//                 const orders = await orderCollection.find(query).toArray();
//                return res.send(orders)
//             }
//             else{
//                 return res.status(403).send({ message: 'Forbidden access' });
//             }
         

//         })

//         ////////////////////////////
//         app.get('/order/:id', async (req, res) => {
//             const id = req.params.id;
//             const query = { _id: ObjectId(id) };
//             const order = await orderCollection.findOne(query);
//             res.send(order);
//         })
       
//         ///////////////////////////
//         app.put('/profile/:email', async (req, res) => {
//             const email = req.params.email;
//             const user = req.body;
//             const filter = { email: email };
//             const options = { upsert: true };
//             const updateDoc = {
//                 $set: user,
//             };
//             const result = await profileCollection.updateOne(filter, updateDoc, options);
           
//             res.send(result);
//         })
//         ///////////////////////////
//         app.get('/profile', async (req, res) => {
//             const email = req.query.email;
//             const query = {email:email}
//             const orders = await profileCollection.find(query).toArray();
//             res.send(orders)

//         })
//         ////////////////////////////
//         app.post('/create-payment-intent', async(req, res)=>{
//             const service = req.body;
//             const price = service.price;
//             console.log(price);
//             const amount = price*100;
//             const paymentIntent = await stripe.paymentIntents.create({
//                 amount : amount,
//                 currency:'usd',
//                 payment_method_types:['card']
//             });
//             res.send({clientSecret: paymentIntent.client_secret})


//         })
//         //////////////////////////

//         //////////////////////////

//     }
//     finally {

//     }

// }
// run().catch(console.dir);

// app.get('/', (req, res) => {
//     res.send('manufacturer web server is running')
// })

// app.listen(port, () => {
//     console.log(`manufacturer listening on port ${port}`)
// })



// const express = require("express");
// const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
// const cors = require("cors");
// require('dotenv').config();
// const app = express();
// const port = process.env.PORT || 5000;


const express = require('express')
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const cors = require('cors');
const jwt = require('jsonwebtoken')
require('dotenv').config();
const app = express()
const port = process.env.PORT || 5000
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

// set middleware
// app.use(cors());
// app.use(express.json());
//set Middlewar
const corsConfig = {
    origin: '*',
    credentials: true,
    methods: ['GET', 'POST', 'PUT','PATCH', 'DELETE']
    }
app.use(cors(corsConfig))
app.use(express.json());

// ////////////////////////////////
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
// ///////////////////////////////



// const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.5a8lj4m.mongodb.net/?retryWrites=true&w=majority`;

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.g84sa.mongodb.net/?retryWrites=true&w=majority`;

// const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
   }
});

async function run() {
  try {
    await client.connect()

        const toolCollection = client.db('agriculture_manufacturer').collection('tools');
        const reviewCollection = client.db('agriculture_manufacturer').collection('reviews');
        const userCollection = client.db('agriculture_manufacturer').collection('users');
        const orderCollection = client.db('agriculture_manufacturer').collection('orders');
        const profileCollection = client.db('agriculture_manufacturer').collection('profiles');

    
  /////////////////////////////////////

       app.get('/user',verifyJWT, async(req, res) =>{
        const users = await userCollection.find().toArray();
        res.send(users);
       })
       /////////////////////////////

  app.put('/user/admin/:email',verifyJWT, async (req, res) => {
            const email = req.params.email;
            const requester = req.decoded.email;
            const requesterAccount = await userCollection.findOne({email:requester})
            if(requesterAccount.role === 'admin'){
                const filter = { email: email };
                const updateDoc = {
                    $set: {role:'admin'},
                };
                const result = await userCollection.updateOne(filter, updateDoc);
                res.send(result);
            }
            else{
                return res.status(403).send({ message: 'Forbidden access' }); 
            }
           
        })

  ///////////////////////////////////
        app.put('/user/:email', async (req, res) => {
            const email = req.params.email;
            const user = req.body;
            const filter = { email: email };
            const options = { upsert: true };
            const updateDoc = {
                $set: user,
            };
            const result = await userCollection.updateOne(filter, updateDoc, options);
            const token = jwt.sign({ email: email }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '24h' })
            res.send({ result, token });
        })
        //////////////////////////////////
        app.get('/admin/:email', async (req, res) => {
            const email = req.params.email;
            const user = await userCollection.findOne({ email: email });
            const isAdmin = user.role === 'admin';
            res.send({ admin: isAdmin });
        })

        ////////////////////////////////

        app.get('/tool', async (req, res) => {
            const query = {};
            const cursor = await toolCollection.find(query);
            const tools = await cursor.toArray();
            res.send(tools);
        })
        ///////////////////////////////////
        app.delete('/tool/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const result = await toolCollection.deleteOne(query);
            res.send(result);
        })

        /////////////////////////////////
        app.get('/tool/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const tool = await toolCollection.findOne(query);
            res.send(tool);
        })
        ////////////////////////////
        app.post('/tool', async (req, res) => {
            const addItem = req.body;
            const result = await toolCollection.insertOne(addItem);
            res.send(result);
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
        /////////////////////////////////////////////

        app.get('/order',verifyJWT, async (req, res) => {
            const query = {};
            const cursor = orderCollection.find(query);
            const orders = await cursor.toArray();
            res.send(orders);
        })
       
        /////////////////////////////
        app.get('/order',verifyJWT, async (req, res) => {
            const email = req.query.email;
            const decodedEmail = req.decoded.email;
            if(email === decodedEmail ){
                const query = {email:email}
                const orders = await orderCollection.find(query).toArray();
               return res.send(orders)
            }
            else{
                return res.status(403).send({ message: 'Forbidden access' });
            }
         

        })

        ////////////////////////////
        app.get('/order/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const order = await orderCollection.findOne(query);
            res.send(order);
        })
       
        ///////////////////////////
        app.put('/profile/:email', async (req, res) => {
            const email = req.params.email;
            const user = req.body;
            const filter = { email: email };
            const options = { upsert: true };
            const updateDoc = {
                $set: user,
            };
            const result = await profileCollection.updateOne(filter, updateDoc, options);
           
            res.send(result);
        })
        ///////////////////////////
        app.get('/profile', async (req, res) => {
            const email = req.query.email;
            const query = {email:email}
            const orders = await profileCollection.find(query).toArray();
            res.send(orders)

        })
        ////////////////////////////
        app.post('/create-payment-intent', async(req, res)=>{
            const service = req.body;
            const price = service.price;
            console.log(price);
            const amount = price*100;
            const paymentIntent = await stripe.paymentIntents.create({
                amount : amount,
                currency:'usd',
                payment_method_types:['card']
            });
            res.send({clientSecret: paymentIntent.client_secret})


        })
        //////////////////////////





    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);


app.get('/', (req, res) => {
    res.send('manufacturer web server is running')
});

app.listen(port, () => {
    console.log(`manufacturer listening on port ${port}`)
})