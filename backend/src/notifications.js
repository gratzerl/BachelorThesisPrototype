//all available subscription events

//replace pubsub from apollo server with pubsub form graphql-redis-subscription
//dedicated redis server necessary for production use

import { PubSub } from 'apollo-server';

export const pubSub = new PubSub();

export const EVENTS = {
    TABLE_ADDED: 'TABLE_ADDED',
    ORDER_ADDED: 'ORDER_ADDED',
    COURSE_ADDED: 'COURSE_ADDED',
    ORDER_CANCELLED: 'ORDER_CANCELLED'
}