const express = require('express');
const router = express.Router();
const { Posts, Likes } = require('../models');

// print data we have in database
router.get('/', async (req, res) => { // every function from sequelize must be async
    const listofPosts = await Posts.findAll({include: [Likes]}); // join with likes table
    res.json(listofPosts);
});

// post data to database through insomnia
router.post('/', async (req, res) => {
    const post = req.body;
    await Posts.create(post); // insert into database
    res.json(post);
});

router.get('/byId/:id', async (req, res) => {
    const id = req.params.id;
    const post = await Posts.findByPk(id);
    res.json(post);
});

module.exports = router; 