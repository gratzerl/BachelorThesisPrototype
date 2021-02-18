import React from 'react';
import PropTypes from 'prop-types';
import { graphql, compose } from 'react-apollo';
import { Query } from 'react-apollo';

import TableList from '../Layout/Partials/TableList';
import OrderColumn from '../OrderColumn/OrderColumn';
import { TABLE_QUERY } from '../../queries/queries';
import { TABLE_ADDED_SUBSCRIPTION } from '../../queries/subscriptions';

import './allTablesList.css';

/*
    component containing all tables (fetches from the server)
    listens to the event "tableAdded" and will refetch tables
*/
class AllTablesList extends React.Component {    
    static propTypes = {
        getTables: PropTypes.object.isRequired,
    }

    constructor(props){
        super(props);
        this.unsubscribe = null;
    }

    componentDidMount(){
        this.unsubscribe = this.props.getTables.subscribeToMore({
            document: TABLE_ADDED_SUBSCRIPTION,
            updateQuery: () => {
                this.props.getTables.refetch();
                return this.props.getTables;
            }
        });
    }   

    render(){
        return(
            <div className="custom-all-tables-list">
                <Query query={TABLE_QUERY}>
                    {({ loading, error, data }) => {
                        if (loading) return <div>Fetching</div>;
                        if (error) {
                            console.log(error);
                            return <div>Error</div>;
                        }
                        const tablesToRender = data.tables; 
                        return (
                            <div className='container-fluid'>
                                <TableList tables={tablesToRender}/> 
                            </div>
                        );
                    }}
                </Query>
            </div>
        );
    }
}

export default compose(
    graphql(TABLE_QUERY, { name: 'getTables' })
)(AllTablesList);

                