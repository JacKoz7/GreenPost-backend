const express = require('express');
const router = express.Router();
const { Posts, Likes } = require('../models');
const { validateToken } = require('../middlewares/AuthMiddleware'); 

// print data we have in database
router.get('/', async (req, res) => { // every function from sequelize must be async
    const listofPosts = await Posts.findAll({include: [Likes]}); // join with likes table
    res.json(listofPosts);
});

// post data to database through insomnia
router.post('/', validateToken,  async (req, res) => {
    const post = req.body;
    post.Username = req.user.Username;
    await Posts.create(post); // insert into database
    res.json(post);
});

router.get('/byId/:id', async (req, res) => {
    const id = req.params.id;
    const post = await Posts.findByPk(id);
    res.json(post);
});

router.put('/title', validateToken, async (req, res) => { // we put validateToken to check if user is logged in
    const { newTitle, id } = req.body;
    await Posts.update({title: newTitle}, {
        where: {
            id: id
        }
    });
    res.json(newTitle);
});

router.put('/postText', validateToken, async (req, res) => { // update post text
    const { newText, id } = req.body;
    await Posts.update({postText: newText}, {
        where: {
            id: id
        }
    });
    res.json(newText);
});

router.delete('/:postId', validateToken, async (req, res) => {
    const postId = req.params.postId;
    await Posts.destroy({
        where: {
            id: postId
        }
    });
    res.json("DELETED SUCCESSFULLY!");
});

module.exports = router;