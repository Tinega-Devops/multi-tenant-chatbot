const dialogflow = require('@google-cloud/dialogflow');

const sessionClient = new dialogflow.SessionsClient();

const sessionPath = sessionClient.projectAgentSessionPath(
    process.env.PROJECTID,
    process.env.SESSION_ID
  );

module.exports = app => {

    app.get('/', (req, res) => {
        res.send({'hello': 'Johnny'})
    });

    

    app.post('/api/text', async (req, res) => {

        const request = {
            session: sessionPath,
            queryInput: {
                text: {
                    text: req.body.text,
                    languageCode: process.env.LANGUAGE_CODE
                }
            }
        };
        let responses = await sessionClient
            .detectIntent(request);

        res.send(responses[0].queryResult)
    });
}