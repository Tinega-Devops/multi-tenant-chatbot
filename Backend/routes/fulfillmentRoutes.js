const {WebhookClient} = require('dialogflow-fulfillment');
const mongoose = require('mongoose');
const Order = mongoose.model('Order');

module.exports = app => {
    app.post('/', async (req, res) => {
        const agent = new WebhookClient({ request: req, response: res });

        const placeOrder= async(agent)=> {
           try{
            const order = new Order({
                products: agent.parameters.product,
                address: agent.parameters.address,
                phone: agent.parameters.phone,
                email: agent.parameters.email,
                order_number:Math.floor(Math.random() * 90000) + 10000,
                customer:agent.parameters.name,
                color:agent.parameters.color,
                size:agent.parameters.size,
            
            });
            
            orders = await order.save();
                console.log(orders);
            } catch (err){
                console.log(err);
            }
            agent.add(`Thank you very much your order has been forwarded to
             our team ,you will get instructions on how to pay for the order from our team shortly .`);
        }

        async function orderStatus(agent){


            let responseText = `You have entered the order number ${agent.parameters.order_number}.`;

            let coupon = await Order.findOne({'order_number': agent.parameters.order_number});
            if (coupon !== null ) {
                responseText = `The status of the order number ${agent.parameters.order_number} is : ${coupon.status}`;
            }

            agent.add(responseText);
            
            
        }
        function fallback(agent) {
            agent.add(`I didn't understand`);
            agent.add(`I'm sorry, can you try again?`);
        }
        let intentMap = new Map();
        intentMap.set('Check order status', orderStatus);
        intentMap.set('place order', placeOrder);
        intentMap.set('Default Fallback Intent', fallback);

        agent.handleRequest(intentMap);
    });
}