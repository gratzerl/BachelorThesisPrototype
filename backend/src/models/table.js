import { Model } from './model';

//table model to resolve queries/mutations
//sends request to the REST-Server
export class Table extends Model {

    static getAllUnfinishedTables(context){
        return super.fetch(this.apiPathTable, {
            clientId: context.clientId,
            params: {
                type: 'unfinished'
            }
        });
    }
    
    static getTable(tableId, context){
        let path = this.apiPathTable + '/' + tableId;
        return super.fetch(path, {            
            clientId: context.clientId,
        });
    }

    static getAllFinishedTables(context){
        return super.fetch(this.apiPathTable, {
            clientId: context.clientId,
            params: {
                type: 'finished'
            }
        });
    }

    static finishTable(tableId, context){
        let path = this.apiPathTable + '/' + tableId;
        return super.fetch(path, {
            clientId: context.clientId,
            method: 'PUT',
            params: {
                action: 'finish',
            }
        });
    }

    static acceptTable(tableId, context){
        let path = this.apiPathTable + '/' + tableId;
        return super.fetch(path, {
            clientId: context.clientId,
            method: 'PUT',
            params: {
                action: 'accept',
            }
        });
    }

    static resetFinishTable(tableId, context){
        let path = this.apiPathTable + '/' + tableId;
        return super.fetch(path, {
            clientId: context.clientId,
            method: 'PUT',
            params: {
                action: 'resetFinish',
            }
        });
    }

    static resetAcceptTable(tableId, context){
        let path = this.apiPathTable + '/' + tableId;
        return super.fetch(path, {
            clientId: context.clientId,
            method: 'PUT',
            params: {
                action: 'resetAccept',
            }
        });
    }

    static restoreTable(tableId, context){
        let path = this.apiPathTable + '/' + tableId;
        return super.fetch(path, {
            clientId: context.clientId,
            method: 'PUT',
            params: {
                action: 'restore',
            }
        });
    }
}
