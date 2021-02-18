import React from 'react';
import PropTypes from 'prop-types';
import { graphql, compose } from 'react-apollo';

import { RESTORE_TABLE_MUTATION, RESTORE_COURSE_MUTATION, RESTORE_ORDER_MUTATION } from '../../queries/mutations';
import { FINISHED_QUERY, COURSES_TABLE_QUERY, ORDERCOLUMN_QUERY, TABLE_QUERY, ORDERS_FOR_COURSE_QUERY } from '../../queries/queries';

import './finishedItem.css';

/*
    Component for rendering recently finished articles in a table row
*/

class FinishedItem extends React.Component {
    static propTypes = {
        order: PropTypes.shape({
            tableId: PropTypes.string,
            tableName: PropTypes.string,
            articleName: PropTypes.string,
            articleId: PropTypes.string,
            amount: PropTypes.number,
            courseNumber: PropTypes.number,
            finishedAt: PropTypes.number,
            cancelledAt: PropTypes.number,
            createdAt: PropTypes.number,
            modifiers: PropTypes.objectOf(
                PropTypes.shape({                
                    modifierTexts: PropTypes.array,                    
                })
            )
        }),
        restoreTable: PropTypes.func,
        restoreCourse: PropTypes.func,
        restoreOrder: PropTypes.func,
    }

    log(order){
        console.log(order);
    }

    render(){
        const { order } = this.props;
        const modifiers = order.modifiers === null ? '' : order.modifiers.modifierTexts.join(', ');
        return(
            <tr>
                <td onClick={() => this.props.restoreTable(order.tableId)}>
                    { order.tableName }
                </td>
                <td onClick={() => this.props.restoreCourse(order.tableId, order.courseNumber)}>
                    { order.courseNumber }
                </td>
                <td onClick={() => this.props.restoreOrder(order.tableId, order.courseNumber, order.articleId, order.createdAt)}>
                    { order.amount }
                </td>
                <td onClick={() => this.props.restoreOrder(order.tableId, order.courseNumber, order.articleId, order.createdAt)}>
                    { order.articleName }
                </td>
                <td>
                    { modifiers }
                </td>
            </tr>
        );
    }
}

export default compose(
    graphql(RESTORE_TABLE_MUTATION, {
        props: ({ ownProps, mutate }) => ({
            restoreTable: (tableId) => 
                mutate({
                    variables: { tableId },
                    refetchQueries: [                        
                        {
                            query: TABLE_QUERY
                        },
                        {
                            query: COURSES_TABLE_QUERY,
                            variables: { tableId: tableId }
                        },
                        {
                            query: ORDERCOLUMN_QUERY
                        },
                        {
                            query: ORDERS_FOR_COURSE_QUERY,
                            variables : { 
                                tableId: tableId,
                                courseNumber: 1
                            }
                        },                        
                        {
                            query: ORDERS_FOR_COURSE_QUERY,
                            variables : { 
                                tableId: tableId,
                                courseNumber: 2
                            }
                        },
                        
                        {
                            query: ORDERS_FOR_COURSE_QUERY,
                            variables : { 
                                tableId: tableId,
                                courseNumber: 3
                            }
                        },
                        {
                            query: FINISHED_QUERY
                        }
                    ]
                })            
        })
    }),
    graphql(RESTORE_COURSE_MUTATION, {
        props: ({ ownProps, mutate }) => ({
            restoreCourse: (tableId, courseNumber) => 
                mutate({
                    variables: { tableId, courseNumber },
                    refetchQueries: [
                        {
                            query: COURSES_TABLE_QUERY,
                            variables: { tableId: tableId }
                        },
                        {
                            query: ORDERCOLUMN_QUERY
                        },
                        {
                            query: TABLE_QUERY
                        },
                        {
                            query: ORDERS_FOR_COURSE_QUERY,
                            variables : { 
                                tableId: tableId,
                                courseNumber: 1
                            }
                        },                        
                        {
                            query: ORDERS_FOR_COURSE_QUERY,
                            variables : { 
                                tableId: tableId,
                                courseNumber: 2
                            }
                        },
                        
                        {
                            query: ORDERS_FOR_COURSE_QUERY,
                            variables : { 
                                tableId: tableId,
                                courseNumber: 3
                            }
                        },
                        {
                            query: FINISHED_QUERY
                        }
                    ]
                })            
        })
    }),
    graphql(RESTORE_ORDER_MUTATION, {
        props: ({ mutate }) => ({
            restoreOrder: (tableId, courseNumber, articleId, createdAt) => 
                mutate({
                    variables: { tableId, courseNumber, articleId, createdAt },
                    refetchQueries: [                        
                        {
                            query: TABLE_QUERY
                        },
                        {
                            query: ORDERS_FOR_COURSE_QUERY,
                            variables : { 
                                tableId: tableId,
                                courseNumber: 1
                            }
                        },                        
                        {
                            query: ORDERS_FOR_COURSE_QUERY,
                            variables : { 
                                tableId: tableId,
                                courseNumber: 2
                            }
                        },
                        
                        {
                            query: ORDERS_FOR_COURSE_QUERY,
                            variables : { 
                                tableId: tableId,
                                courseNumber: 3
                            }
                        },
                        {
                            query: FINISHED_QUERY
                        },
                        {
                            query: COURSES_TABLE_QUERY,
                            variables: { tableId: tableId }
                        },
                        {
                            query: ORDERCOLUMN_QUERY
                        },
                    ]
                })            
        })
    })
)(FinishedItem);