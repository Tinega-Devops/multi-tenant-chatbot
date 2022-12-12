const chatbot = require('../chatbot/chatbot');

module.exports = app => {

    app.get('/', (req, res) => {
        res.send({'hello': 'Johnny'})
    });

    

    app.post('/api/text', async (req, res) => {

        let responses = await chatbot.textQuery(req.body.text, req.body.parameters);
        res.send(responses[0].queryResult);
    });

    app.post('/api/event', async (req, res) => {
        let responses = await chatbot.eventQuery(req.body.event, req.body.parameters);
        res.send(responses[0].queryResult);
    });
}