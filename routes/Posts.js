const express = require('express');
const router = express.Router();
const { Posts } = require('../models');

// print data we have in database
router.get('/', async (req, res) => { // every function from sequelize must be async
    const listofPosts = await Posts.findAll();
    res.json(listofPosts);
});

// post data to database through insomnia
router.post('/', async (req, res) => {
    const post = req.body;
    await Posts.create(post); // insert into database
    res.json(post);
});

module.exports = router; 