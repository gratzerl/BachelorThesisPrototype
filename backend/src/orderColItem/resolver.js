import { OrderColItem as OrderColItemModel } from '../models/orderColItem';


export const resolvers = {
    Query: {
        orderColOrders: (obj, args, context) => {
            return OrderColItemModel.getAllUnfinishedOrders(context);
        }
    },
    OrderColItem: {
        modifiers: (orderColItem, args, context) => {
            return OrderColItemModel.getModifiersForItem(orderColItem.articleId, context);
        }
    }
}