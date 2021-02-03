const express = require('express');
const mongodb = require('mongodb');
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const url = process.env.MONGODB_URI;

const connectionParams = {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    // useMongoClient: true,
}

const router = express.Router();

router.get('/', async (req, res) => {
    res.json(res.subscriber)
    const email = req.body.email;
    console.log('email', email);
    const users = await loadUserCollection();
    if (!req.body.email) res.status(500).send("Server error");
    users.find({ email })
        .then((resp) => res.send(resp))
        .catch((err) => res.send({ err }))
});

router.get('/', async (req, res) => {
    const email = req.params.email;
    console.log('email 2', email);
    const users = await loadUserCollection();
    res.send(await users.find({}).toArray());
});

// Add users
router.post('/', async (req, res) => {
    const users = await loadUserCollection();
    await users.insertOne({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
        image: req.body.image,
        createdAt: new Date(),
    });
    res.status(201).send();
})

// Delete users
router.delete('/:id', async (req, res) => {
    const users = await loadUserCollection();
    await users.deleteOne({ _id: new mongodb.ObjectID(req.params.id) })
    res.status(200).send();
});

async function loadUserCollection() {
    const client = await mongodb.MongoClient.connect(
        url,
        connectionParams,
    );

    return client.db('RSApp').collection('users');
}

module.exports = router;