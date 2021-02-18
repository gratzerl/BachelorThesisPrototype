import { Table as TableModel } from '../models/table';
import { Course as CourseModel } from '../models/course';
import { pubSub, EVENTS } from '../notifications';
import { convertToUnixTS } from '../util/util';

//resolver for Table

export const resolvers = {
    //table queries
    Query: {
        tables(obj, args, context){
            return TableModel.getAllUnfinishedTables(context);
        },
        table(obj, args, context){
            return TableModel.getTable(args.tableId, context);
        }
    },
    //table mutations
    Mutation: {
        acceptTable(obj, args, context){
            return TableModel.acceptTable(args.tableId, context);
        },
        finishTable(obj, args, context){
            return TableModel.finishTable(args.tableId, context);
        },
        resetFinishTable(obj, args, context){
            return TableModel.resetFinishTable(args.tableId, context);
        },
        resetAcceptTable(obj, args, context){
            return TableModel.resetAcceptTable(args.tableId, context);
        },
        restoreTable(obj, args, context){
            return TableModel.restoreTable(args.tableId, context);
        }
    },
    //table subscriptions
    Subscription: {
        tableAdded: {
            subscribe: () => {
                return pubSub.asyncIterator(EVENTS.TABLE_ADDED);
            }
        },
    },
    //resolve complex data fields in the Table type, ie Course
    //adapt simple data fields
    Table: {
        //define methods to resolve custom fields
        //simple data fields will be resolved automatically if not listed here
        //adapt return value of simple data fields
        courses: (table, args, context) => CourseModel.getCoursesForTable(table.tableId, context),
        finishedAt: (table) => { return table.finishedAt == -1 ? null : table.finishedAt},
        createdAt: (table) => { return table.createdAt == -1 ? null : table.createdAt},
        acceptedAt: (table) => { return table.acceptedAt == -1 ? null : table.acceptedAt },
    }
}