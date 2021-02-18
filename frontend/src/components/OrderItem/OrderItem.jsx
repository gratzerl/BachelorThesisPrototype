import React from 'react';
import PropTypes from 'prop-types';
import { graphql, compose } from 'react-apollo';
import shortid from 'shortid';

import { ORDERS_FOR_COURSE_QUERY, ORDERCOLUMN_QUERY, COURSES_TABLE_QUERY, TABLE_QUERY, FINISHED_QUERY } from '../../queries/queries';
import { RESET_FINISH_ORDER_MUTATION, FINISH_ORDER_MUTATION, ACCEPT_TABLE_MUTATION } from '../../queries/mutations';
import { TOGGLE_POPUP, SET_POPUP_CONTENT, SETTINGS_QUERY } from '../../queries/state';
import ModifierList from '../Layout/Partials/ModifierList';

import YesNoPopup from '../YesNoPopup/YesNoPopup';

import { timeDifferenceSeconds, timeInHourMinutes } from '../../util/time';

import './orderItem.css';

/*
    Component which renders an order
    Shows amount and renders the modifiers of the order
    contains finishing/unfinishing functionality
*/

class OrderItem extends React.Component {
    static propTypes = {
        order: PropTypes.shape({
            articleId: PropTypes.string,
            tableId: PropTypes.string,
            amount: PropTypes.number,
            courseNumber: PropTypes.number,
            articleName: PropTypes.String,
            createdAt: PropTypes.number,
            cancelledAt: PropTypes.number,
            finishedAt: PropTypes.number,
            modifiers: PropTypes.object,
        }),
        tableStatus: PropTypes.func,
        acceptTable: PropTypes.func,

        finishOrder: PropTypes.func,
        resetFinishOrder: PropTypes.func,

        togglePopup: PropTypes.func,
        setPopupContent: PropTypes.func,

        showPopup: PropTypes.bool,
    }

    constructor(props){
        super(props);
        this.unsubscribe = null;
        this.state = {
            isNew: false
        }
        this.timerId = null;
    }

    componentDidMount(){
        const { order } = this.props;
        if(timeDifferenceSeconds(null, order.createdAt) < 10 || false){
            this.setState({isNew: true});
            this.timerId = setTimeout(() => {
                this.setState({ isNew: false });
            }, 5000);
        }
    }

    componentWillUnmount(){
        clearTimeout(this.timerId);
    }

    handleClick(){
        const { order } = this.props;
        if(this.props.tableStatus(order.tableId) !== null){
            if(this.props.order.finishedAt === null){
                this.props.finishOrder(order.tableId, order.courseNumber, order.articleId, order.createdAt, order.cancelledAt)          
            }
            else {
                if(this.props.showPopup){
                    this.props.setPopupContent(
                        <YesNoPopup 
                            content='Abrufung rückgängig machen?'
                            yesFunc={() =>  this.props.resetFinishOrder(order.tableId, order.courseNumber, order.articleId, order.createdAt)}
                            closeFunc={() => {this.props.setPopupContent(null) ; this.props.togglePopup()}}/>
                    );                
                    this.props.togglePopup();
                }
                else{
                    this.props.resetFinishOrder(order.tableId, order.courseNumber, order.articleId, order.createdAt);
                }                      
            }
        }
        else {
            this.props.setPopupContent(
                <YesNoPopup 
                    title='Der Tisch ist noch nicht in Bearbeitung'
                    content='Jetzt zur Bearbeitung übernehmen?'
                    yesFunc={() => this.props.acceptTable(order.tableId)}
                    closeFunc={() => {this.props.setPopupContent(null) ; this.props.togglePopup()}}/>
            );               
            this.props.togglePopup(); 
        }
    }

    getOrderStatus(){
        const { order } = this.props;
        const tableFinished = this.props.tableStatus(order.tableId);
        const status = '' + 
                    (order.finishedAt === null ? '' : ' custom-order-item-finished') + 
                    (tableFinished === null ? ' disabled' : ' active') + 
                    (order.cancelledAt === null ? '' : ' custom-order-item-cancelled');
        return status;
    }

    render(){
        const { order } = this.props;
        const finished = order.finishedAt;
        const tableFinished = this.props.tableStatus(order.tableId);
        const isNew = this.state.isNew;
        if(order.finishedAt !== null && order.cancelledAt != null)
            return null;
        return(
            <div className={ 'custom-order-item' + (isNew ? ' custom-blink' : '')} key={shortid.generate()} onClick={ () => this.handleClick() }>
                <span className={ this.getOrderStatus() }>

                    {order.cancelledAt !== null ? 'STORNO: ' : ''}
            
                    {finished === null ? (order.amount + ' x ' ) : (timeInHourMinutes(order.finishedAt) + ' ')}

                    {order.articleName} 
                    
                    {finished === null ? '' : (' (' + order.amount + ')' )}

                    <span className='custom-icon'>
                        {finished !== null ? 
                            <i className='fa fa-undo mr-2'></i> : 
                            <i className={'far fa-square  square-icon mr-2' + (tableFinished === null ? ' disabled' : '')}></i>} 
                    </span>
                    <br/>               
                    {(order.modifiers !== null && finished === null) ?
                       <ModifierList key={shortid.generate()} modifier={order.modifiers}/>
                        : null
                    }
                </span> 
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
    graphql(ACCEPT_TABLE_MUTATION, { 
        props: ({ mutate }) => ({
            acceptTable: (tableId) => 
                mutate({ 
                    variables: { tableId },
                    refetchQueries: [
                        { query: TABLE_QUERY }
                    ]
                })
        })
    }),
    graphql(FINISH_ORDER_MUTATION, {
        props: ({ ownProps, mutate }) => ({
            finishOrder: (tableId, courseNumber, articleId, createdAt, cancelledAt) =>
                mutate({
                    variables: { tableId, courseNumber, articleId, createdAt, cancelledAt },
                    refetchQueries: [
                        {
                            query: ORDERS_FOR_COURSE_QUERY,
                            variables: { 
                                tableId: ownProps.order.tableId, 
                                courseNumber: ownProps.order.courseNumber 
                            }
                        },
                        {
                            query: ORDERCOLUMN_QUERY
                        },
                        {
                            query: COURSES_TABLE_QUERY,
                            variables: { tableId: ownProps.order.tableId }
                        },
                        {
                            query: TABLE_QUERY
                        },
                        {
                            query: FINISHED_QUERY
                        }
                    ],
                })
        })
    }),
    graphql(RESET_FINISH_ORDER_MUTATION, {
        props: ({ mutate }) => ({
            resetFinishOrder: (tableId, courseNumber, articleId, createdAt) =>
                mutate({
                    variables: { tableId, courseNumber, articleId, createdAt },
                    refetchQueries: [
                        {
                            query: ORDERS_FOR_COURSE_QUERY,
                            variables: { 
                                tableId: tableId, 
                                courseNumber: courseNumber 
                            }
                        },
                        {
                            query: ORDERCOLUMN_QUERY
                        },
                        {
                            query: COURSES_TABLE_QUERY,
                            variables: { tableId: tableId }
                        },
                        {
                            query: TABLE_QUERY
                        },
                        {
                            query: FINISHED_QUERY
                        }
                    ],
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
    }),
)(OrderItem);
