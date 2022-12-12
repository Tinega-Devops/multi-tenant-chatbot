const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan')
require('dotenv').config()
//dotenv.config()

const app = express();
app.use(morgan('tiny'))
app.use(bodyParser.json());

require('./routes/dialogFlowRoutes')(app);


const PORT = process.env.PORT ;
console.log("server is up and running")
app.listen(PORT);