import gql from 'graphql-tag';



export const COURSES_TABLE_QUERY = gql`
    query coursesForTable($tableId: String!){
        coursesForTable(tableId: $tableId){
            courseNumber,
            tableId,
            finishedAt
        }
    }
`;

export const ORDERCOLUMN_QUERY = gql`
    {
        orderColOrders {
            amount,
            articleName
            modifiers {
                amount
                modifierTexts
            }
        }
    }
`;

export const FINISHED_ITEMS_QUERY = gql`
    {
        orders {
            tableId
            courseNumber
            amount
            articleName
            modifiers {
                modifierTexts
            }
        }
    }
`;

export const ORDERS_FOR_COURSE_QUERY = gql`
    query ordersForCourse($tableId: String!, $courseNumber: Int!){
        ordersForCourse(tableId: $tableId, courseNumber: $courseNumber){
            articleId
            tableId
            amount
            courseNumber
            articleName
            finishedAt
            acceptedAt
            createdAt
            cancelledAt
            modifiers {
                modifierTexts
            }
        }
    }
`;

export const TABLE_QUERY = gql`
    query tables {
        tables {
            tableId
            tableName
            employeeName
            createdAt
            acceptedAt
            finishedAt
        }
    }
`;

export const ORDERS_QUERY = gql`
    query orders {
        orders {
            tableId,
            finishedAt
        }
    }
`;

export const FINISHED_QUERY = gql`
    query allFinishedOrders {
        allFinishedOrders{
            tableId
            tableName
            articleName
            articleId
            amount
            courseNumber
            finishedAt
            cancelledAt
            createdAt
            modifiers {
                modifierTexts
            }
        }
    }
`;