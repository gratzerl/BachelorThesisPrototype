import React from 'react';
import FinishedItemList from '../Layout/Partials/FinishedItemList';
import { Query } from 'react-apollo';

import { FINISHED_QUERY } from '../../queries/queries';
import './AllFinishedItemsList.css'

//Information about recently finished articles

class AllFinishedItemsList extends React.Component {
    render(){
        return(
            <Query query={ FINISHED_QUERY }>
                {({ loading, error, data }) => {
                    if (loading) return <div>Fetching</div>;
                    if (error) {
                        console.log(error);
                        return <div>Error</div>;
                    }
                    const orders = data.allFinishedOrders;
                    return (
                        <div className='custom-overlay-content custom-overlay-list'>
                            <h1 className='custom-overlay-header'>Letzte Abrufungen</h1>
                            <FinishedItemList orders={orders}/> 
                        </div>
                    );
                }}
            </Query>
        );
    }
}

export default AllFinishedItemsList;