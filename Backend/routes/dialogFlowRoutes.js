const chatbot = require('../chatbot');

module.exports = app => {

     app.post('/api/text', async (req, res) => {

        let responses = await chatbot.textQuery(req.body.text, req.body.parameters);
        res.send(responses[0].queryResult);
    });

    app.post('/api/event', async (req, res) => {
        let responses = await chatbot.eventQuery(req.body.event, req.body.parameters);
        res.send(responses[0].queryResult);
    });

    app.get('/api/get_client_token', async (req, res) => {
        let token = await chatbot.getToken();
        res.send({token});
    })
}