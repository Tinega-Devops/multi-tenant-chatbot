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


# Running the App in Dev

To run the application locally you should :

Navigate to `/Backend` folder and install dependencies by running the command `npm install` then after the installation is complete
run `npm run dev` you will see the server up and running on port 8000.

For the two frontend client navigate to `/client` folder install dependencies by command `npm install` then run `npm start ` to start the react up you should see the app running in the browser on port 3000. Navigate to the `/client-two` and run same command you run in `/client` you should see the app running in the browser on port 3001.

To expose local host domain to the internet to get a webhook url for the fulfillment .Install Ngrok server and run `ngrok http 8000` .The command will generate a https domain that you will register with the fulfillment on the dialogflow console for two Agents .One Agent should be exposed via `/` endpoint while the other `/webhook ` endpoint as defined in the server routes.

# Running on Docker

To containerize the applications ,navigate to the app folders ,`/Backend` ,`/client` & `/client-two` in each folders run the `docker build -t <your image name> .` .Then run the images locally with command `docker run ` with a `-p` tag and the specify ports on which the apps should run on. To use the images on kubernetes cluster push the images to docker hub via `docker push ` command.

# Running on Kubernetes and Applying Istio Deployment ,Loadbalancing ,Circuit breakers.

Finally to deploy the application on kubernetes navigate to the `/manifest` .At this point i assume you have istio installed locally on your cluster and you have enabled istio automatic injection .If thats not the case you should first of all install and configure sidecar injection for more info on how to do this you check out the [istio documentation](https://istio.io/latest/docs/setup/getting-started/). Via `kubectl cli` .Run the following commands to deploy the application to your local cluster.

`kubectl apply -f kubernetes.yml` to create deployments and services for the application, then `kubectl apply -f istio-gateway.yml `,`kubectl apply -f chabot-client-istio.yml` and `kubectl apply -f chabot-client-istio.yml` to create `istio gateway` and expose the application  then apply `virtual services` & `Destination Rules` for traffic management and `circuit breakers`.