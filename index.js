const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config()
const port = process.env.PORT || 5000;


// middleware
app.use(cors());
app.use(express.json());


const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.jgjgvfa.mongodb.net/?retryWrites=true&w=majority`;

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
    // Connect the client to the server	(optional starting in v4.7)
    // await client.connect();
    // Send a ping to confirm a successful connection

    const featureCollection = client.db("teclinkDb").collection("feature");
    const trendingCollection = client.db("teclinkDb").collection("trending");
    const trendingsCollection = client.db("teclinkDb").collection("trendss");

    app.get('/feature', async(req, res) => {
        const result = await featureCollection.find().toArray();
        res.send(result);
    })

    app.get('/trending', async(req, res) => {
        const result = await trendingCollection.find().toArray();
        res.send(result);
    })

    app.get('/trendss', async(req, res) => {
        const result = await trendingsCollection.find().toArray();
        res.send(result);
    })

    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);


app.get('/', (req, res) => {
    res.send('teclink is running')
})

app.listen(port, () => {
    console.log(`teclink is running on port ${port}`);
})