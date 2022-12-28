const express = require('express');
const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const morgan = require('morgan');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();




const app = express();
const config = process.env.MONGODB_URI;

mongoose.set('strictQuery', true);
mongoose.connect(config, { useNewUrlParser: true })
.then(()=>console.log("successfully connected to Database"))
.catch((err) => console.log("DB Error => ", err));

/** Swagger Initialization - START */
const swaggerOption = {
    swaggerDefinition: (swaggerJsdoc.Options = {
      info: {
        title: "Mult Tenant Chatbot ",
        description: "API documentation",
        contact: {
          name: "Developer",
        },
        servers: ["http://localhost:8000/api"],
      },
    }),
    apis: ["index.js", "./routes/*.js"],
  };
  
  const swaggerDocs = swaggerJsdoc(swaggerOption);
  app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

  /** Swagger Initialization - END */
  

require('./models/order');


// middlewares
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(cors());



require('./routes/dialogFlowRoutes')(app);
require('./routes/fulfillmentRoutes')(app);
require('./routes/fulfillmentRouteTwo')(app);



const PORT = process.env.PORT ;

app.listen(PORT,(()=>console.log(`server is up and running on port ${PORT}`)));