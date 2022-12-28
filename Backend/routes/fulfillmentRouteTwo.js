const {WebhookClient} = require('dialogflow-fulfillment');



module.exports = app => {
    app.post('/webhook', async (req, res) => {

/**
 * @swagger
 * /webhook:
 *   post:
 *      description: Used to get response from dialogflow webhook for the second Agent
 *      tags:
 *          - Webhook
 *      responses:
 *          '200':
 *              description: Resource added successfully
 *          '500':
 *              description: Internal server error
 *          '400':
 *              description: Bad request
 */
        const agent = new WebhookClient({ request: req, response: res });

        const checkout= async(agent)=> {

            console.log(agent.parameters)
           
            agent.add(`Thank you for providing the information .Purchase was successful.`);
        }

        async function specialOffer(agent){

    


            agent.add(`Have a look at our website we always have same interesting offers there.`);
            
            
        }
        function fallback(agent) {
            agent.add(`I didn't understand`);
            agent.add(`I'm sorry, can you try again?`);
        }
        let intentMap = new Map();
        intentMap.set('check out', checkout);
        intentMap.set('Special Offers',specialOffer);
        intentMap.set('Default Fallback Intent', fallback);

        agent.handleRequest(intentMap);
    });
}