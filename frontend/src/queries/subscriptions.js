import gql from 'graphql-tag';

export const COURSE_ADDED_SUBSCRIPTION = gql`
    subscription courseAdded {
        courseAdded {
            courseNumber,
            tableId,
            finishedAt
        }
    }
`;

export const ORDER_ADDED_SUBSCRIPTION = gql`
    subscription orderAdded {
        orderAdded {
            articleId
            tableId
            amount
            courseNumber
            articleName
            finishedAt
            createdAt
            acceptedAt
            cancelledAt
            modifiers {  
                modifierTexts
            }
        }
    }
`;

export const ORDER_CANCELLED_SUBSCRIPTION = gql`
    subscription orderCancelled {
        orderCancelled {
            articleId
            tableId
            amount
            courseNumber
            articleName
            finishedAt
            createdAt
            acceptedAt
            cancelledAt
            modifiers { 
                modifierTexts
            }
        }
    }
`;

export const TABLE_ADDED_SUBSCRIPTION = gql`
    subscription tableAdded {
        tableAdded {
            tableId,
            employeeName,
            acceptedAt,
            createdAt,
            finishedAt
        }
    }
`;