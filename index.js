const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const mongoose = require('mongoose');
require('dotenv').config()
//dotenv.config()

const app = express();
const config = process.env.MONGODB_URI;

mongoose.set('strictQuery', true);
mongoose.connect(config, { useNewUrlParser: true });

require('./models/Registration');
require('./models/Demand');
require('./models/Coupons');

app.use(morgan('tiny'))
app.use(bodyParser.json());


require('./routes/dialogFlowRoutes')(app);
require('./routes/fulfillmentRoutes')(app);



const PORT = process.env.PORT ;

app.listen(PORT,(()=>console.log(`server is up and running on port ${PORT}`)));