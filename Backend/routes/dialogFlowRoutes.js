const chatbot = require('../chatbot/chatbot');


module.exports = app => {

     app.post('/api/text', async (req, res) => {
 /**
 * @swagger
 * /api/text:
 *   post:
 *      description: Used to detect user intents
 *      tags:
 *          - Intents
 *      parameters:
 *          - in: body
 *            name: text query
 *            description: Text query
 *            schema:
 *              type: object
 *              required:
 *                 - text
 *              properties:
 *                  text:
 *                      type: string
 *                      example: Hello
 *      responses:
 *          '200':
 *              description: Resource added successfully
 *          '500':
 *              description: Internal server error
 *          '400':
 *              description: Bad request
 */



        let responses = await chatbot.textQuery(req.body.text, req.body.parameters);
        res.send(responses[0].queryResult);
    });

    app.post('/api/event', async (req, res) => {

/**
 * @swagger
 * /api/event:
 *   post:
 *      description: Used to detect user intents
 *      tags:
 *          - Intents
 *      parameters:
 *          - in: body
 *            name: text query
 *            description: Text query
 *            schema:
 *              type: object
 *              required:
 *                 - event
 *              properties:
 *                  event:
 *                      type: string
 *                      example: welcome
 *      responses:
 *          '200':
 *              description: Resource added successfully
 *          '500':
 *              description: Internal server error
 *          '400':
 *              description: Bad request
 */




        let responses = await chatbot.eventQuery(req.body.event, req.body.parameters);
        res.send(responses[0].queryResult);
    });

    app.get('/api/get_client_token', async (req, res) => {
/**
 * @swagger
 * /api/get_client_token:
 *   get:
 *      description: Used to generate client token that is used for authenticating user to dialogflow
 *      tags:
 *          - Client Token
 *      responses:
 *          '200':
 *              description: Resource added successfully
 *          '500':
 *              description: Internal server error
 *          '400':
 *              description: Bad request
 */
        let token = await chatbot.getToken();
        res.send({token});
    })

    app.get('/api/client_token', async (req, res) => {

         /**
 * @swagger
 * /api/client_token:
 *   get:
 *      description: Used to generate client token that is used for authenticating user to dialogflow
 *      tags:
 *          - Client Token
 *      responses:
 *          '200':
 *              description: Resource added successfully
 *          '500':
 *              description: Internal server error
 *          '400':
 *              description: Bad request
 */
        let token = await chatbot.getTokenClient2();
        res.send({token});
    })
}