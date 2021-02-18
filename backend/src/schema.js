import Table  from './table/schema';
import Course from './course/schema';
import Order from './order/schema';
import Modifier from './modifier/schema';
import OrderColItem from './orderColItem/schema';
import OrderColModifier from './orderColModifier/schema';

import rootResolvers from './resolvers';

import { makeExecutableSchema } from 'graphql-tools';

//define all available quries, mutations and subscriptions

//all queries
const RootQuery = `
    type Query {
        tables: [Table]
        table(tableId: String!): Table
        allFinishedOrders: [Order]
        coursesForTable(tableId: String!): [Course]
        ordersForCourse(tableId: String!, courseNumber: Int!): [Order]
        orders: [Order]
        orderColOrders: [OrderColItem]
    }
`;

//all mutations
const RootMutation = `
    type Mutation {
        acceptTable(tableId: String!): Table
        finishOrder(tableId: String!, courseNumber: Int!, articleId: String!, createdAt: Int!, cancelledAt: Int): Order
        resetFinishOrder(tableId: String!, courseNumber: Int!, articleId: String!, createdAt: Int!): Order
        finishCourse(tableId: String!, courseNumber: Int!): Course
        resetFinishCourse(tableId: String! courseNumber: Int!): Course
        finishTable(tableId: String!): Table
        resetFinishTable(tableId: String!): Table                
        resetAcceptTable(tableId: String!): Table
        restoreTable(tableId: String!): Table
        restoreCourse(tableId: String!, courseNumber: Int!): Course
        restoreOrder(tableId: String!, courseNumber: Int!, articleId: String!, createdAt: Int!): Order
    }
`;

//all subscriptions
const RootSubscription = `
    type Subscription {
        tableAdded: Table
        orderAdded: Order
        orderCancelled: Order
        courseAdded: Course
    }
`;

//add all queries, mutations and subscriptions to the schema
const SchemaDefinition = `
    schema {
        query: Query,
        mutation: Mutation
        subscription: Subscription
    }
`;

//combine all types and resolvers and create an executable schema 
const Schema = makeExecutableSchema({
    typeDefs: [ 
        SchemaDefinition, 
        RootQuery, 
        RootMutation, 
        RootSubscription, 
        Table, 
        Course, 
        Order, 
        Modifier, 
        OrderColItem, 
        OrderColModifier,
    ],
    resolvers: rootResolvers
});


export default Schema;