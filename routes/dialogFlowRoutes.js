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

    app.post('/api/df_text_query', (req, res) => {
        res.send({'do': 'text query'})
    });

    app.post('/api/df_event_query', (req, res) => {

        const request = {
            session: sessionPath,
            queryInput: {
                text: {
                    text: req.body.text,
                    languageCode: config.dialogFlowSessionLanguageCode
                }
            }
        };
        sessionClient
            .detectIntent(request)
            .then(responses => {
                console.log('Detected intent');
                const result = responses[0].queryResult;
                console.log(`  Query: ${result.queryText}`);
                console.log(`  Response: ${result.fulfillmentText}`);
                if (result.intent) {
                    console.log(`  Intent: ${result.intent.displayName}`);
                } else {
                    console.log(`  No intent matched.`);
                }
            })
            .catch(err => {
                console.error('ERROR:', err);
            });
        res.send({'do': 'event query'})
    });
}