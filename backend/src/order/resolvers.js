import { Modifier as ModifierModel } from '../models/modifier';
import { Order as OrderModel } from '../models/order';
import { pubSub, EVENTS } from '../notifications';

export const resolvers = {
    //order queries
    Query: {
        orders(obj, args, context){
            const data =  OrderModel.getAllUnfinished(context);
            return data;
        },
        ordersForCourse(obj, args, context){
            return OrderModel.getOrdersForCourse(args.tableId, args.courseNumber, context);
        },
        allFinishedOrders(obj, args, context){
            return OrderModel.getAllFinishedOrders(context);
        }
    },
    //order mutations
    Mutation: {
        finishOrder(obj, args, context){
            return OrderModel.finishOrder(args.tableId, args.articleId, args.courseNumber, args.createdAt, args.cancelledAt, context);
        },
        resetFinishOrder(obj, args, context){
            return OrderModel.resetFinishOrder(args.tableId, args.articleId, args.courseNumber, args.createdAt, context);
        },
        restoreOrder(obj, args, context){
            return OrderModel.restoreOrder(args.tableId, args.articleId, args.courseNumber, args.createdAt, context);
        }
    },
    //order subscriptions
    Subscription: {
        orderAdded: {
            subscribe: () => {
                return pubSub.asyncIterator(EVENTS.ORDER_ADDED);
            }
        },
        orderCancelled: {
            subscribe: () => {
                return pubSub.asyncIterator(EVENTS.ORDER_CANCELLED);
            }
        }
    },
    //resolve complex data fields in the Order type, ie Modifier
    //adapt simple data fields
    Order: {
        //define methods to resolve custom fields
        //simple data fields will be resolved automatically if not listed here
        //adapt return value of simple data fields
        modifiers(order, args, context){
            return ModifierModel.getModifiersForOrder(order, context);
        },
        acceptedAt: (order) => { return order.acceptedAt == -1 ? null : order.acceptedAt },
        finishedAt: (order) => { return order.finishedAt == -1 ? null : order.finishedAt},
        cancelledAt: (order) => { return order.cancelledAt == -1 ? null : order.cancelledAt},
    }
};