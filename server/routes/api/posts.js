const express = require('express');
const mongodb = require('mongodb');

const router = express.Router();

// Get Posts
router.get('/', async (req, res) => {
    const posts = await loadPostsCollection();
    // find方法裡面為空陣列，表示get所有資料
    const findResult = await posts.find({}).toArray();
    res.send(findResult);
});

// Add Post
router.post('/', async (req, res) => {
    const posts = await loadPostsCollection();
    const insertResult = await posts.insertOne({
        text: req.body.text,
        createdAt: new Date()
    })

    res.status(201).send({ success: true });
    console.log(`New post created with the following id: ${insertResult.insertedId}`);
});

// Delete Post
router.delete('/:id', async (req, res) => {
    const posts = await loadPostsCollection();
    // 注意資料庫中的_id的紀錄方式為 - _id: ObjectId("61bde0bb825287a587313042")，
    // 從request取回req.params.id值為字串，需透過mongodb.ObjectId(req.params.id)轉換為ObjectId
    const deleteResult = await posts.deleteOne({_id: mongodb.ObjectId(req.params.id)});
    res.status(200).send();
    console.log(`${deleteResult.deletedCount} document(s) was/were deleted`)
})

// 連接資料庫
async function loadPostsCollection() {
    const { MongoClient } = require("mongodb");
    const uri = "mongodb+srv://allen123:allen123@cluster0.vq9ik.mongodb.net/vue_express?retryWrites=true&w=majority";
    const client = new MongoClient(uri);
    await client.connect();
    return client.db('vue_express').collection('posts');
}


module.exports = router;