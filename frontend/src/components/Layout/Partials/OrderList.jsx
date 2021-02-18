import React from 'react';
import PropTypes from 'prop-types';
import { compose, graphql } from 'react-apollo';
import shortid from 'shortid';

import { ARTICLE_FILTER_QUERY } from '../../../queries/state';
import OrderItem from '../../OrderItem/OrderItem';


class OrderList extends React.Component{  
    static propTypes = {
        courseNumber: PropTypes.number,
        tableId: PropTypes.string,
        orders: PropTypes.array,
        tableStatus: PropTypes.func,

        filterActive: PropTypes.bool
    }


    applyFilter(orders){
        //show no finished articles
        if(this.props.filterActive){
            return orders.filter(order => {
                return order.finishedAt === null;
            });
        }
        return orders;
    }

    render(){
        const { orders } = this.props;
        const filteredOrders = this.applyFilter(orders);
        const orderList = filteredOrders.map(order => {
            return (
                <OrderItem key={shortid.generate()} order={order} tableStatus={this.props.tableStatus.bind(this)}/>                
            );
        });

        return (
            <div key={shortid.generate()}>
                {orderList}
            </div>
        );

    }
}

export default compose(
    graphql(ARTICLE_FILTER_QUERY, {
        props: ({ data: { articleFinishedFilter } }) => {
            return ({            
                filterActive: articleFinishedFilter
            })}
    })
)(OrderList);