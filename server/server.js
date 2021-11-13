const express = require('express');
const app = express();
require('dotenv').config();
app.use(express.json());

// Connecting to Database
const mongoose = require('mongoose')
mongoose.connect(process.env.MONGO_URL,
  (err) => {
    err ? console.log(err)
    : console.log('Database connected')
  }
);

//Routes
const userRoute = require('./routes/user.routes.js');
app.use('/users', userRoute);
const postRoute = require('./routes/post.routes');
app.use('/posts', postRoute);

// set port, listen for requests
const PORT = process.env.PORT ;
app.listen(PORT, (err) => {
  err ? console.log(err) 
  : console.log(`Server is running on port ${PORT}.`);
})