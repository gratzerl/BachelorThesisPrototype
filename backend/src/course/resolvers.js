import { Order as OrderModel } from '../models/order';
import { Course as CourseModel } from '../models/course';
import { pubSub, EVENTS } from '../notifications';

//course resolver
export const resolvers = {
    //course queries
    Query: {
        coursesForTable(obj, args, context){
            return CourseModel.getCoursesForTable(args.tableId, context);
        }
    },
    //course mutations
    Mutation: {
        finishCourse(obj, args, context){
            return CourseModel.finishCourse(args.tableId, args.courseNumber, context);
        },
        resetFinishCourse(obj, args, context){
            return CourseModel.resetFinishCourse(args.tableId, args.courseNumber, context);
        },
        restoreCourse(obj, args, context){
            return CourseModel.restoreCourse(args.tableId, args.courseNumber, context);
        }
    },
    //course subscriptions
    Subscription: {
        courseAdded: {
            subscribe: () => {
                return pubSub.asyncIterator(EVENTS.COURSE_ADDED);
            }
        }
    },
    //resolve complex data fields in the Course type, ie Order
    //adapt simple data fields
    Course: {
        //define methods to resolve custom fields
        //simple data fields will be resolved automatically if not listed here
        //adapt return value of simple data fields
        orders(course, args, context){
            return OrderModel.getOrdersForCourse(course.courseNumber, course.tableId, context);
        }, //replace -1 with null 
        finishedAt: (course) => { return course.finishedAt == -1 ? null : course.finishedAt }
    }

}