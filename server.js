
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

//import routes
const postRoutes = require('./routes/posts');
const staffRoute = require('./routes/staffRoute');
const accountRoute = require('./routes/accountRoute');
const otherstaffRoute = require('./routes/otherstaffRoute');
const branchRoute = require('./routes/branchRoute');
const doctorRoute = require('./routes/doctorRoute');

//app middleware
app.use(bodyParser.json());
app.use(cors());

//route middleware

app.use(postRoutes);
app.use(staffRoute);
app.use(accountRoute);
app.use(otherstaffRoute);
app.use(branchRoute);
app.use(doctorRoute);

const PORT = 8000;
const DB_URL = 'mongodb+srv://root:password1234@medflow-hms.febircl.mongodb.net/maindatabase?retryWrites=true&w=majority&appName=MedFlow-HMS';

mongoose.connect(DB_URL)
    .then(() => {
        console.log('DB connected');
    })
    .catch((err) => console.log('DB connection', err));

app.listen(PORT, () => {
    console.log(`app is running on ${PORT}`);
});