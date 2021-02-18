import React from 'react';
import PropTypes from 'prop-types';
import { graphql, compose } from 'react-apollo';
import { Query } from 'react-apollo';
import shortid from 'shortid';

import { ACCEPT_TABLE_MUTATION, RESET_ACCEPT_TABLE_MUTATION, FINISH_TABLE_MUTATION } from '../../queries/mutations';
import { TOGGLE_POPUP, SET_POPUP_CONTENT, SETTINGS_QUERY } from '../../queries/state'
import { COURSES_TABLE_QUERY, TABLE_QUERY, ORDERCOLUMN_QUERY, FINISHED_QUERY } from '../../queries/queries';
import { COURSE_ADDED_SUBSCRIPTION } from '../../queries/subscriptions';

import CourseList from '../Layout/Partials/CourseList';
import TableHeader from '../Layout/Partials/TableHeader';
import YesNoPopup from '../YesNoPopup/YesNoPopup';

import { timeDifferenceSeconds } from '../../util/time';

import '../../tableItem.css';

/*
    Component for displaying a table
    contains accepting and finishing functionality
    renders list of the table's courses
*/
class TableItem extends React.Component{
    static propTypes = {
        table: PropTypes.shape({
            tableId: PropTypes.string,
            tableName: PropTypes.string,
            employeeName: PropTypes.string,
            acceptedAt: PropTypes.number,
            createdAt: PropTypes.number,
            finishedAt: PropTypes.number,
        }),

        getCourses: PropTypes.object,
        getOrderCol: PropTypes.object,
        acceptTable: PropTypes.func,
        finishTable: PropTypes.func,
        resetFinishTable: PropTypes.func,
        resetAcceptTable: PropTypes.func,

        togglePopup: PropTypes.func,
        setPopupContent: PropTypes.func,

        showPopup: PropTypes.bool,
    }

    constructor(props){
        super(props);
        this.tableStatus = this.tableStatus.bind(this);
        this.unsubscribe = null;
        this.state = {
            isNew: false
        }
        this.timerId = null;
    }


    componentDidMount(){      
        const { table } = this.props;  

        this.unsubscribe = this.props.getCourses.subscribeToMore({
            document: COURSE_ADDED_SUBSCRIPTION,
            updateQuery: () => {
                this.props.getCourses.refetch(this.props.table.tableId);
                this.props.getOrderCol.refetch();
                return this.props.getCourses;
            }
        });

        if(timeDifferenceSeconds(null, table.createdAt) < 10){
            this.setState({isNew: true});
            this.timerId = setTimeout(() => {
                this.setState({isNew: false});
            }, 5000);
        }
    }

    componentWillUnmount(){
        clearInterval(this.timerId);
    }

    tableStatus(){
        return this.props.table.acceptedAt;
    }


    handleAccept(){
        const { table } = this.props;
        if(table.acceptedAt === null){
            this.props.acceptTable(table.tableId);
        }
        else {            
            this.props.resetAcceptTable(table.tableId);
        }
    }
    
    handleFinish(){
        const { table } = this.props;
        if(table.finishedAt === null && table.acceptedAt !== null){
            // if(this.props.showPopup){
            //     this.props.setPopupContent(
            //                     <YesNoPopup 
            //                         content='Wollen Sie den Tisch wirklich abrufen?'
            //                         yesFunc={() => this.props.finishTable(table.tableId)}
            //                         closeFunc={() => {this.props.setPopupContent(null) ; this.props.togglePopup()}}/>
            //                 );               
            //     this.props.togglePopup();     
            // }
            // else{
                this.props.finishTable(table.tableId)
            //}
        }
    }
    

    render(){
        const { table } = this.props;
        const isNew = this.state.isNew;
        return(
            <div key={shortid.generate()} className={'custom-table-item card' + (isNew ? ' custom-blink' : '')}>
                <div>                    
                    <button type="button" className={'btn custom-table-button custom-accept-table-button' + (table.acceptedAt === null ? '' : ' accepted')} onClick={() => this.handleAccept()}> 
                       { table.acceptedAt === null ? 'Bearbeiten' : 'Rückstellen'}
                    </button>
                    <button type="button" className='btn custom-table-button custom-finish-table-button' disabled={table.acceptedAt === null ? true : false} onClick={() => this.handleFinish()}> 
                        Abrufen 
                    </button>
                    <TableHeader table={table}/>
                </div>                   
                <div className="card-body custom-table-body">   
                    <Query query={ COURSES_TABLE_QUERY } variables={{ tableId: table.tableId }}>
                        {({ loading, error, data }) => {
                            if (loading) return <div>Fetching</div>;
                            if (error) {
                                console.log(error);
                                return <div>Error</div>;
                            }
                            const coursesToRender = data.coursesForTable; 
                            return (
                                <CourseList tableId={ table.tableId } courses={ coursesToRender } tableStatus={ this.tableStatus.bind(this) } className="list-group list-group-flush"/>
                            );
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
    graphql(FINISH_TABLE_MUTATION, { 
        props: ({ mutate }) => ({
            finishTable: (tableId) =>
                mutate({
                    variables: { tableId },
                    refetchQueries: [
                        {
                            query: TABLE_QUERY
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
    graphql(RESET_ACCEPT_TABLE_MUTATION, { 
        props: ({ mutate }) => ({
            resetAcceptTable: (tableId) =>
                mutate({
                    variables: { tableId },
                    refetchQueries: [
                        { query: TABLE_QUERY }
                    ]
                })
        })
    }),
    graphql(COURSES_TABLE_QUERY, { 
        name: 'getCourses',
        options: (props) => ({
            variables: { tableId: props.table.tableId }
        })
    }),
    graphql(ORDERCOLUMN_QUERY, 
        { name: 'getOrderCol' }
    ),
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
)(TableItem);