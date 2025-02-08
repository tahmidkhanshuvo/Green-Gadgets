const express = require('express');
const bodyParser = require('body-parser');
const userRouter = require('./routes/userRoutes');
const mongoose = require('mongoose');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 4000;

console.log('Starting server...');

mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
}).then(() => {
    console.log('Connected to MongoDB');
}).catch((error) => {
    console.error('Error connecting to MongoDB:', error.message);
});

app.use(bodyParser.json());
app.use('/user', userRouter);

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});