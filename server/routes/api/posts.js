const express = require('express');
const mongodb = require('mongodb');

if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

const router = express.Router();

const url = process.env.MONGODB_URI;

const connectionParams = {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
}

// Get Posts
router.get('/', async (req, res) => {
    const posts = await loadPostCollection();
    res.send(await posts.find({}).toArray());
});

// Add Posts
router.post('/', async (req, res) => {
    const posts = await loadPostCollection();
    await posts.insertOne({
        text: req.body.text,
        createdAt: new Date(),
    });
    res.status(201).send();
})

// Delete Posts
router.delete('/:id', async (req, res) => {
    const posts = await loadPostCollection();
    await posts.deleteOne({ _id: new mongodb.ObjectID(req.params.id) })
    res.status(200).send();
});

async function loadPostCollection() {
    const client = await mongodb.MongoClient.connect(
        url,
        connectionParams,
    );

    return client.db('RSApp').collection('minibuh');
}

module.exports = router;