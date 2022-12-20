# multi-tenant-chatbot
The applicatio is about creating a simple task mult-tenant-ecommerce chatbot .The application is developed in React for frontend and Node.js Express for Backend.The google Dialogflow API was used as the NLP and NLU platform .

# Directories

The app has three main folders :
 - **Backend** This folder contains the backend code for the chatbot application.Its were all business logic of the chatbot are handled.
 - **Client** This directory has the frontend code .It creates the chatbot UI for querying backend.
 - **Client-two** This is directory for the second UI for the chatbot.

# Environment Setup

In order to run this application on your local environment you must 

1. Ensure you have `Docker ` ,`Kubernetes ` and `Istio ` installed and are up and running.

2. Then proceed to google Dialogflow console and create your Dialogflow account .Then upload the zip files provided for the dialogflow Agents to create the    Agents used on this project.
3. Create the service accounts for the agents and provide them with the neccessary roles .The finally add keys to this service account and generete the key    files.
4. Setup a Mongodb database on your local environment .

5. Clone the repo with the following url.

``` 
$ git clone https://github.com/Tinega-Devops/multi-tenant-chatbot.git
```
6. Navigate to `client/.env.example` , `client-two/.env.example` & `Backend/.env.example` change the file names to .env and add the specified secrets.


export GOOGLE_APPLICATION_CREDENTIALS =./chatbot.json 
