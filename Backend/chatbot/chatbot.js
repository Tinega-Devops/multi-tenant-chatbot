'use strict';
const dialogflow = require('@google-cloud/dialogflow');
const {struct} = require('pb-util');
const mongoose = require('mongoose');
const googleAuth = require('google-oauth-jwt');

//const sessionClient = new dialogflow.SessionsClient();
const credentials = {
    client_email: process.env.CLIENT_EMAIL,
    private_key: process.env.PRIVATE_KEY ,
};
const projectId=process.env.PROJECTID
const sessionClient = new dialogflow.SessionsClient({projectId, credentials});
//const sessionPath = sessionClient.sessionPath(projectId, sessionId);
const sessionPath = sessionClient.projectAgentSessionPath(
    process.env.PROJECTID,
    process.env.SESSION_ID
  );

  const Registration = mongoose.model('registration');

  module.exports = {

    getToken: async function() {
        return new Promise((resolve) => {
            googleAuth.authenticate(
                {
                    email: process.env.CLIENT_EMAIL,
                    key:  process.env.PRIVATE_KEY,
                    scopes: ['https://www.googleapis.com/auth/cloud-platform'],
                },
                (err, token) => {
                    resolve(token);
                },
            );
        });
    },
       
    textQuery: async function(text, userID, parameters = {}) {
        let self = module.exports;
        const sessionPath = sessionClient.projectAgentSessionPath(process.env.PROJECTID, process.env.SESSION_ID + userID);

        const request = {
            session: sessionPath,
            queryInput: {
                text: {
                    text: text,
                    languageCode: process.env.LANGUAGE_CODE,
                },
            },
            queryParams: {
                payload: {
                    data: parameters
                }
            }
        };
        let responses = await sessionClient.detectIntent(request);
        responses = await self.handleAction(responses);
        return responses;

    },

    eventQuery: async function(event, userID,  parameters = {}) {
        let self = module.exports;
        let sessionPath = sessionClient.projectAgentSessionPath(process.env.PROJECTID, process.env.SESSION_ID + userID);

        const request = {
            session: sessionPath,
            queryInput: {
                event: {
                    name: event,
                    parameters: struct.encode(parameters), //Dialogflow's v2 API uses gRPC. You'll need a jsonToStructProto method to convert your JavaScript object to a proto struct.
                    languageCode: process.env.LANGUAGE_CODE,
                },
            }
        };
        let responses = await sessionClient.detectIntent(request);
        responses = self.handleAction(responses);
        return responses;
    },
    handleAction: function(responses){
        let queryResult = responses[0].queryResult;

        switch (queryResult.action) {
            case 'recommendcourses-yes':
                if (queryResult.allRequiredParamsPresent) {

                    self.saveRegistration(queryResult.parameters.fields);

                }
                break;
        }

        // console.log(queryResult.action);
        // console.log(queryResult.allRequiredParamsPresent);
        // console.log(queryResult.fulfillmentMessages);
        // console.log(queryResult.parameters.fields);
        return responses;
    },

    saveRegistration: async function(fields){
        const registration = new Registration({
            name: fields.name.stringValue,
            address: fields.address.stringValue,
            phone: fields.phone.stringValue,
            email: fields.email.stringValue,
            dateSent: Date.now()
        });
        try{
            let reg = await registration.save();
            console.log(reg);
        } catch (err){
            console.log(err);
        }
    }
}
