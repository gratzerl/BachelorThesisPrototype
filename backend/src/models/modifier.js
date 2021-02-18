import { Model } from './model';

//Modifier model to resolve queries/mutations
//sends request to the REST-Server
export class Modifier extends Model {
    static getModifiersForOrder(order, context){
        const path =    this.apiPathTable + "/" + order.tableId + 
                        this.apiPathCourse + "/" + order.courseNumber + 
                        this.apiPathOrder + "/" + order.articleId + "/" + order.createdAt + this.apiPathModifier;
        return super.fetch(path, {
            clientId: context.clientId,
        });
        
    }

    static getModifiersByArticleId(articleId, context){
        const path = this.apiPathOrder + "/" + articleId + this.apiPathModifier;
        return super.fetch(path, {
            clientId: context.clientId
        });
    }
}