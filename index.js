const express = require('express');
const cors = require('cors');
require('dotenv').config()
const app = express()
const port = process.env.PORT || 5000;
// middle ware
// turitors
// VDj6Lte7asKNcKii
app.use(cors())
app.use(express.json())

const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const uri = "mongodb+srv://turitors:VDj6Lte7asKNcKii@cluster0.pii6nyx.mongodb.net/?retryWrites=true&w=majority";

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
        // await client.connect();
        const collection = client.db("Turitors").collection("assinment")
        const submitedAssinment = client.db("Turitors").collection("submitedAssinment")
        const submittedMarkFeedback = client.db("Turitors").collection("markFeedback")
        // app.get('/createAssainment/:title', async (req, res) => {
        //     const data = req.params.title
        //     const query = { title: data }
        //     const result = await collection.find(query).toArray()
        //     res.send(result)
        // })
        // app.get('/createAssainment/:id', async (req, res) => {
        //     const id = req.params.id
        //     const filter = { _id: new ObjectId(id) }
        //     const result = await collection.deleteOne(filter)
        //     res.send(result)
        // })
        app.get('/updateAssignment/:id', async (req, res) => {
            const id = req.params.id
            console.log(id)
            const filter = { _id: new ObjectId(id) }
            const result = await collection.findOne(filter)
            res.send(result)
        })
        app.put('/updateAssignment/:id', async (req, res) => {
            const id = req.params.id;
            const filter = { _id: new ObjectId(id) };
            const updateAssignment = req.body;
            const updateDoc = {
                $set: {
                    title: updateAssignment.title,
                    difficulty: updateAssignment.difficulty,
                    description: updateAssignment.description,
                    url: updateAssignment.url,
                    marks: updateAssignment.marks,
                }
            };
            const result = await collection.updateOne(filter, updateDoc);
            res.send(result);
        })
        // app.get('/createAssainment/:title', async (req, res) => {
        //     const data = req.params.title
        //     const query = { title: data }
        //     const result = await collection.find(query).toArray()
        //     res.send(result)
        // })
        app.get('/createAssainment/:id', async (req, res) => {
            const id = req.params.id
            const query = { _id: new ObjectId(id) };
            const result = await collection.findOne(query);
            res.send(result);
        })
        app.get('/createAssainment', async (req, res) => {
            const cursor = collection.find();
            const result = await cursor.toArray();
            res.send(result);
        })
        app.put('/createAssainment/:id', async (req, res) => {
            const id = req.params.id;
            const filter = { _id: new ObjectId(id) };
            const updateAssignment = req.body;
            const updateDoc = {
                $set: {
                    title: updateAssignment.title,
                    difficulty: updateAssignment.difficulty,
                    description: updateAssignment.description,
                    url: updateAssignment.url,
                    marks: updateAssignment.marks,
                }
            };
            const result = await collection.updateOne(filter, updateDoc);
            res.send(result);
        });
        app.delete('/createAssainment/:id', async (req, res) => {
            const id = req.params.id
            const filter = { _id: new ObjectId(id) }
            const result = await collection.deleteOne(filter)
            res.send(result)
        })
        app.post('/createAssainment', async (req, res) => {
            const newAssinment = req.body;
            const result = await collection.insertOne(newAssinment);
            res.send(result)
        });
        // post for modal data 
        app.post('/submitedAssignment', async (req, res) => {
            const newSubmitedAssingnment = req.body
            const result = await submitedAssinment.insertOne(newSubmitedAssingnment)
            res.send(result)
        })
        // get for modal data
        app.get('/submitedAssignment', async (req, res) => {
            const cursor = submitedAssinment.find();
            const result = await cursor.toArray();
            res.send(result);
        })
        app.get('/submitedAssignment/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: new ObjectId(id) };
            const result = await submitedAssinment.findOne(query);
            res.send(result);
        })
        // for update
        app.put('/submitedAssignment/:id', async (req, res) => {
            const id = req.params.id;
            const filter = { _id: new ObjectId(id) };
            const updateAssignmentMark = req.body;
            const updateDoc = {
                $set: {
                    marks: updateAssignmentMark.marks,
                    feedback: updateAssignmentMark.feedback
                }
            };
            // console.log(updateDoc);
            const result = await submitedAssinment.updateOne(filter, updateDoc);
            res.send(result);
        });
        app.post('/markFeedback', async (req, res) => {
            const submitMarkFeedback = req.body;
            const result = await submittedMarkFeedback.insertOne(submitMarkFeedback);
            res.send(result)
        });
        app.get('/markFeedback', async (req, res) => {
            const cursor = submittedMarkFeedback.find();
            const result = await cursor.toArray();
            res.send(result);
        })


        // Send a ping to confirm a successful connection
        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
        // Ensures that the client will close when you finish/error
        // 
        // await client.close();
    }
}
run().catch(console.dir);




app.get('/', (req, res) => {
    res.send('Turitors')
})
app.listen(port, () => {
    console.log(`server is running:${port}`);
})