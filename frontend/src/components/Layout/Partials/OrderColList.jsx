import React from 'react';
import PropTypes from 'prop-types';
import shortid from 'shortid';

import OrderColItem from '../../OrderColItem/OrderColItem';



class OrderColList extends React.Component{  
    static propTypes = {
        orders: PropTypes.array
    }

    render(){
        const { orders } = this.props;
        const orderList = orders.map(order => {
            return (
                <OrderColItem key={shortid.generate()} order={order}/>                
            );
        });

        return (
            <div key={shortid.generate()} className='custom-order-column-list'>
                {orderList}
            </div>
        );

    }
}

export default OrderColList;
