import gql from 'graphql-tag';

export const ACCEPT_TABLE_MUTATION = gql`
    mutation acceptTable($tableId: String!){
        acceptTable(tableId: $tableId){
            employeeName,
            acceptedAt
        }
    }
`;

export const RESET_ACCEPT_TABLE_MUTATION = gql`
    mutation resetAcceptTable($tableId: String!){
        resetAcceptTable(tableId: $tableId){
            employeeName,
            acceptedAt
        }
    }
`;

export const FINISH_TABLE_MUTATION = gql`
    mutation finishTable($tableId: String!){
        finishTable(tableId: $tableId){
            tableId,
            finishedAt
        }
    }
`;

export const RESET_FINISH_TABLE_MUTATION = gql`
    mutation resetFinishTable($tableId: String!){
        resetFinishTable(tableId: $tableId){
            tableId,
            finishedAt
        }
    }
`;

export const FINISH_ORDER_MUTATION = gql`
    mutation finishOrder($tableId: String!, $courseNumber: Int!, $articleId: String!, $createdAt: Int!, $cancelledAt: Int){
        finishOrder(tableId: $tableId, courseNumber: $courseNumber, articleId: $articleId, createdAt: $createdAt, cancelledAt: $cancelledAt){
            finishedAt,
            articleId,
            tableId,
            amount,
            articleName, 
            modifiers {
                modifierTexts
            }
        }
    }
`;

export const RESET_FINISH_ORDER_MUTATION = gql`
    mutation resetFinishOrder($tableId: String!, $courseNumber: Int!, $articleId: String!, $createdAt: Int!){
        resetFinishOrder(tableId: $tableId, courseNumber: $courseNumber, articleId: $articleId, createdAt: $createdAt){
            finishedAt,
            articleId,
            tableId,
            amount,
            articleName, 
            modifiers {
                modifierTexts
            }
        }
    }
`;

export const FINISH_COURSE_MUTATION = gql`
    mutation finishCourse($tableId: String!, $courseNumber: Int!){
        finishCourse(tableId: $tableId, courseNumber: $courseNumber){
            courseNumber, 
            finishedAt,
            orders {
                articleName,
                finishedAt
                createdAt
            }
        }
    }
`;

export const RESET_FINISH_COURSE_MUTATION = gql`
    mutation resetFinishCourse($tableId: String!, $courseNumber: Int!){
        resetFinishCourse(tableId: $tableId, courseNumber: $courseNumber){
            courseNumber, 
            finishedAt,
            orders {
                articleName,
                finishedAt
                createdAt
            }
        }
    }
`;


/*
    Restore already finished tables
*/


export const RESTORE_TABLE_MUTATION = gql`
    mutation restoreTable($tableId: String!){
        restoreTable(tableId: $tableId){
            finishedAt
        }
    }
`;

export const RESTORE_ORDER_MUTATION = gql`
    mutation restoreOrder($tableId: String!, $courseNumber: Int!, $articleId: String!, $createdAt: Int!){
        restoreOrder(tableId: $tableId, courseNumber: $courseNumber, articleId: $articleId, createdAt: $createdAt){
            finishedAt
        }
    }
`;

export const RESTORE_COURSE_MUTATION = gql`
    mutation restoreCourse($tableId: String!, $courseNumber: Int!){
        restoreCourse(tableId: $tableId, courseNumber: $courseNumber){
            finishedAt
        }
    }
`;