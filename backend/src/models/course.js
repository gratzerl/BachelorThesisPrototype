import { Model } from './model';

//course model to resolve queries/mutations
//sends request to the REST-Server
export class Course extends Model {

    static getCourse(tableId, courseNumber, context){
        const path = this.apiPathTable + tableId + this.apiPathCourse + courseNumber;
        return super.fetch(path, {
            clientId: context.clientId,
        });
    }

    static getCoursesForTable(tableId, context){
        const path = this.apiPathTable + "/" + tableId + this.apiPathCourse;
        return super.fetch(path, {
            clientId: context.clientId,
        });
    }
    static finishCourse(tableId, courseNumber, context){
        const path = this.apiPathTable + "/" + tableId + this.apiPathCourse + "/" + courseNumber;
        return super.fetch(path, {
            method: 'PUT',
            clientId: context.clientId,
            params: {
                action: 'finish',
            }
        })
    }
    
    static resetFinishCourse(tableId, courseNumber, context){
        const path = this.apiPathTable + "/" + tableId + this.apiPathCourse + "/" + courseNumber;
        return super.fetch(path, {
            clientId: context.clientId,
            method: 'PUT',
            params: {
                action: 'resetFinish',
            }
        })
    }

    static restoreCourse(tableId, courseNumber, context){
        const path = this.apiPathTable + "/" + tableId + this.apiPathCourse + "/" + courseNumber;
        return super.fetch(path, {
            clientId: context.clientId,
            method: 'PUT',
            params: {
                action: 'restore',
            }
        })
    }
}
