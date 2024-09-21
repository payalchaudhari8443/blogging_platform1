const express = require('express');
const mongoose = require('mongoose');
const app = express();
const postsRouter = require('./routes/posts');

// Replace with your MongoDB Atlas connection string
const uri = "mongodb+srv://chaudharipayal2002:HvvS2FsuEirlVqVG@cluster0.uljfm.mongodb.net/?retryWrites=true&w=majority";

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("Connected to MongoDB"))
    .catch(err => console.error("Could not connect to MongoDB...", err));

app.use(express.json());

// Root route
app.get('/', (req, res) => {
    res.send("Welcome to the Blogging Platform API!");
});

// Link to posts routes
app.use('/api/posts', postsRouter);

app.listen(5000, () => {
    console.log("Server running on http://localhost:5000");
});
