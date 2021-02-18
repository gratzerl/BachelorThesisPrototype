import React from 'react';
import PropTypes from 'prop-types';
import { graphql, compose } from 'react-apollo';
import shortid from 'shortid';
import { Query } from 'react-apollo';

import { COURSES_TABLE_QUERY, ORDERCOLUMN_QUERY, TABLE_QUERY, ORDERS_FOR_COURSE_QUERY, FINISHED_QUERY } from '../../queries/queries';
import { FINISH_COURSE_MUTATION, RESET_FINISH_COURSE_MUTATION } from '../../queries/mutations';
import { ORDER_ADDED_SUBSCRIPTION, ORDER_CANCELLED_SUBSCRIPTION } from '../../queries/subscriptions';
import { TOGGLE_POPUP, SET_POPUP_CONTENT, SETTINGS_QUERY } from '../../queries/state';

import OrderList from '../Layout/Partials/OrderList';
import YesNoPopup from '../YesNoPopup/YesNoPopup';

import './courseItem.css';

/*
    Component for a course
    contains functionality to finish/unfinish a course
    
*/
class CourseItem extends React.Component {
    static propTypes = {
        course: PropTypes.shape({
            tableId: PropTypes.string,
            finishedAt: PropTypes.number,
            courseNumber: PropTypes.number,
            orders: PropTypes.array
        }),

        tableStatus: PropTypes.func,
        finishCourse: PropTypes.func,
        getOrderCol: PropTypes.object,
        getOrders: PropTypes.object,

        togglePopup: PropTypes.func,
        setPopupContent: PropTypes.func,

        showPopup: PropTypes.bool,
    }

    constructor(props){
        super(props);
        this.unsubscribe = null;
    }

    componentDidMount(){
        this.unsubscribe = [
            this.props.getOrders.subscribeToMore({
                document: ORDER_ADDED_SUBSCRIPTION,
                updateQuery: () => {
                    this.props.getOrders.refetch(this.props.course.tableId, this.props.course.courseNumber);
                    this.props.getOrderCol.refetch();
                    return this.props.getOrders;
                }
            }),
            this.props.getOrders.subscribeToMore({
                document: ORDER_CANCELLED_SUBSCRIPTION,
                updateQuery: () => {
                    this.props.getOrders.refetch(this.props.course.tableId, this.props.course.courseNumber);
                    this.props.getOrderCol.refetch();
                    return this.props.getOrders;
                }
            })
        ];
    }

    handleClick(){
        //Tisch ist in Bearbeitung
        const { course } = this.props;
        if(this.props.tableStatus(course.tableId) !== null){
            if(course.finishedAt === null){
                this.props.finishCourse(course.tableId, course.courseNumber)
            }
            else {
                if(this.props.showPopup){
                    this.props.setPopupContent(
                        <YesNoPopup 
                            content="Abrufung rückgängig machen?"
                            yesFunc={() => this.props.resetFinishCourse(course.tableId, course.courseNumber)}
                            closeFunc={() => {this.props.setPopupContent(null) ; this.props.togglePopup()}}/>
                    );                
                    this.props.togglePopup();
                }
                else{
                    this.props.resetFinishCourse(course.tableId, course.courseNumber);
                }
            }                        
        }
    }

    render(){
        const { course } = this.props;
        return (
            <div key={shortid.generate()} className='custom-course-item'>
                <div className='custom-course-header'>
                    <button className={'btn custom-course-button' + (course.finishedAt !== null ? ' finished' : '')}
                            onClick={() => this.handleClick()}
                            disabled={this.props.tableStatus(course.tableId) === null ? true : false}>
                        <span className={'' + (course.finishedAt !== null ? ' custom-course-finished' : '')}>
                            {course.courseNumber}. Gang 
                            {course.finishedAt !== null ? <i className="fa fa-undo ml-2"></i> : null} 
                        </span>
                    </button>  
                                     
                </div>
                <div className='custom-course-body'>
                    <Query query={ ORDERS_FOR_COURSE_QUERY } variables={{ tableId: course.tableId, courseNumber: course.courseNumber}}>
                        {({ loading, error, data }) => {
                            if (loading) return <div>Fetching</div>;
                            if (error) {
                                console.log(error);
                                return <div>Error</div>;
                            }
                            const ordersToRender = data.ordersForCourse; 
                            return <OrderList courseNumber={course.courseNumber} tableId={course.tableId} orders={ordersToRender} tableStatus={this.props.tableStatus.bind(this)}/>                                                        
                        }}
                    </Query>
                </div>
            </div>
        );
    }
}



export default compose(
    graphql(SETTINGS_QUERY, {
        props: ({ data: { Settings }}) => {
            return ({            
                showPopup: Settings.showPopup
            })}
    }),
    graphql(FINISH_COURSE_MUTATION, {
        props: ({ mutate }) => ({
            finishCourse: (tableId, courseNumber) =>
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
                                courseNumber: courseNumber
                            }
                        },
                        {
                            query: FINISHED_QUERY
                        }
                    ]
                })
        })
    }),
    graphql(ORDERS_FOR_COURSE_QUERY, { 
        name: 'getOrders',
        options: (props) => ({
            variables: { tableId: props.course.tableId, courseNumber: props.course.courseNumber }
        })
    }),
    graphql(ORDERCOLUMN_QUERY, { name: 'getOrderCol' }),
    graphql(RESET_FINISH_COURSE_MUTATION, {
        props: ({  mutate }) => ({
            resetFinishCourse: (tableId, courseNumber) =>
                mutate({
                    variables: { tableId, courseNumber },
                    refetchQueries: [
                        {
                            query: ORDERS_FOR_COURSE_QUERY,
                            variables : {
                                tableId: tableId,
                                courseNumber: courseNumber
                            }
                        },
                        {
                            query: COURSES_TABLE_QUERY,
                            variables: { tableId: tableId }
                        },
                        {
                            query: ORDERCOLUMN_QUERY
                        },
                        {
                            query: FINISHED_QUERY
                        }                        
                    ]
                })
        })
    }),
    graphql(TOGGLE_POPUP, {
        props: ({ mutate }) => ({
            togglePopup: () => 
                mutate({})            
        })   
    }),
    graphql(SET_POPUP_CONTENT, {
        props: ({ mutate }) => ({
            setPopupContent: (content) => 
                mutate({
                    variables: { content }
                })            
        })
    })
)(CourseItem);
