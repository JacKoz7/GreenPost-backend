const express = require('express');
const app = express();
const cors = require('cors');

app.use(express.json()); // parse json data from request body
app.use(cors()); // allow requests from any origin

const db = require('./models');

const PORT = process.env.PORT || 3001; // works for heroku

// Routers
const postRouter = require('./routes/Posts');
app.use('/posts', postRouter);

db.sequelize.sync().then(() => {
    app.listen(PORT, () => { 
        console.log('Server is running on port 3001');      
    });
}); 
