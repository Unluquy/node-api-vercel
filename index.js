//const app = require('./app');
const config = require('./config/config.js');

const PORT = 5000

console.log(`NODE_ENV=${config.NODE_ENV}`);
app.listen(PORT, () => console.log('Server started on port ' + PORT));

const express = require('express');
//const connectDB = require('./config/db');
const cors = require('cors');

const app = express();

//Connect Database
//connectDB();

app.use(cors());

//middleware
app.use(express.json());
app.use(express.urlencoded({extended:false}));

//Define Routes
app.use('/api/user', require('./routes/user'));

app.use('/api/visites', require('./routes/visites'));
