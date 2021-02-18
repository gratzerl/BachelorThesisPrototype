import { Model } from './model';

export class OrderColItem extends Model {
    static getAllUnfinishedOrders(context){
        const path = this.apiPathOrder;
        return super.fetch(path, {
            clientId: context.clientId,
            params: {
                type: 'unfinished'
            }
        });
    }

    static getModifiersForItem(articleId, context){
        const path = this.apiPathOrder + "/" + articleId + this.apiPathModifier;
        return super.fetch(path, {
            clientId: context.clientId
        });
    }
}