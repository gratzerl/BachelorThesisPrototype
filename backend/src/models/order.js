import { Model } from './model';

//order model to resolve queries/mutations
//sends request to the REST-Server
export class Order extends Model {
    static getAllUnfinished(context){
        const path = this.apiPathOrder;
        return super.fetch(path, {
            clientId: context.clientId,
            params: {
                type: 'unfinished'
            }
        });
    }

    static getAllFinishedOrders(context){
        const path = this.apiPathOrder;
        return super.fetch(path, {
            clientId: context.clientId,
            params: {
                type: 'finished'
            }
        });
    }

    static getOrdersForCourse(tableId, courseNumber, context){
        const path = this.apiPathTable + "/" + tableId + this.apiPathCourse + "/" + courseNumber + this.apiPathOrder;
        return super.fetch(path, {
            clientId: context.clientId
        });
    }

    static getOrdersForTable(tableId, context){
        const path =  courseNumber + this.apiPathOrder + "/" + tableId;
        return super.fetch(path, {
            clientId: context.clientId
        });
    }

    static finishOrder(tableId, articleId, courseNumber, createdAt, cancelledAt, context){
        const path = this.apiPathTable + "/" + tableId + this.apiPathCourse + "/" + courseNumber + this.apiPathOrder + "/" + articleId + "/" + createdAt;
        return super.fetch(path, {
                clientId: context.clientId,
                method: 'PUT',
                params: {
                    action: 'finish',
                    cancelledAt: cancelledAt,
                }
        });
}

    static resetFinishOrder(tableId, articleId, courseNumber, createdAt, context){
        const path = this.apiPathTable + "/" + tableId + this.apiPathCourse + "/" + courseNumber + this.apiPathOrder + "/" + articleId + "/" + createdAt;
        return super.fetch(path, {
            clientId: context.clientId,
            method: 'PUT',
            params: {
                action: 'resetFinish'
            }
        });
    }

    static restoreOrder(tableId, articleId, courseNumber, createdAt, context){
        const path = this.apiPathTable + "/" + tableId + this.apiPathCourse + "/" + courseNumber + this.apiPathOrder + "/" + articleId + "/" + createdAt;
        return super.fetch(path, {
            clientId: context.clientId,
            method: 'PUT',
            params: {
                action: 'restore'
            }
        });
    }
}
