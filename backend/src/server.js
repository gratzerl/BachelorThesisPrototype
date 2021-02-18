import { ApolloServer } from 'apollo-server-express';
import Schema from './schema';
import express from 'express';
import cors from 'cors';
import { createServer } from 'http';
import { SubscriptionServer } from 'subscriptions-transport-ws';
import { execute, subscribe } from 'graphql';

import { pubSub, EVENTS } from './notifications';


const PORT = 4000;

/*express famework for webhooks*/
const app = express();

app.use(cors());

//"webhooks" for publishing events, ie new table/orders added
//returned data from publish is unused atm

//new table was added
app.post('/table', (req, res) => {
    pubSub.publish(EVENTS.TABLE_ADDED, {
        "data": {
            "tableAdded": newTable
        }
    });
    res.send('success');
});

//new course was added
app.post('/course', (req, res) =>{
    pubSub.publish(EVENTS.COURSE_ADDED, {
        "data": {
            "courseAdded" : newCourse
        }
    })
    pubSub.publish(EVENTS.ORDER_ADDED, {
        "data": {
            "orderAdded" : newOrder
        }
    });
    res.send('success');
});

//new order was added
app.post('/order', (req, res) => {
    pubSub.publish(EVENTS.ORDER_ADDED, {
        "data": {
            "orderAdded" : newOrder2
        }
    });
    res.send('success');
});

//order was cancelled
app.put('/order', (req, res) => {
    pubSub.publish(EVENTS.ORDER_CANCELLED, {});
    res.send('success');
});

//create apolloserver with the schema and a context
//get the client id from the authorization header and store it in the context
const server = new ApolloServer({
    graphiql: true,
    schema: Schema,
    context: ({req}) => {
        //const token = req.headers.authorization || '';
        const token = 1;
        const clientId = (token === '' ? 1 : token);
        return {
            clientId
        }
    }
});

//add express to the apollo server
server.applyMiddleware({app});

//websocket server for subscriptions
const httpServer = createServer(app);

httpServer.listen(PORT, () => {
        console.log("GraphQL Server is running");
    }
);

//server for subscriptions
SubscriptionServer.create({
    execute,
    subscribe,
    schema: Schema,
}, {
    path: '/subscriptions',
    server: httpServer,
});