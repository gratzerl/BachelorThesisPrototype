import React from 'react';
import PropTypes from 'prop-types';
import { graphql, compose } from 'react-apollo';
import shortid from 'shortid';

import { ORDERCOL_MODIFIER_FILTER_QUERY } from '../../queries/state';
import OrderColModList from '../Layout/Partials/OrderColModList';

class OrderColItem extends React.Component{
    static propTypes = {
        order: PropTypes.shape({
            amount: PropTypes.number,
            articleName: PropTypes.string,
            modifiers: PropTypes.array
        }),
        modifierFilterActive: PropTypes.bool,
    }

    render(){
        const { order } = this.props;
        
        return(
            <div key={shortid.generate()} className='order-column-item'>
                { order.amount } x { order.articleName }
                {this.props.modifierFilterActive ? 
                    <OrderColModList modifiers={order.modifiers}/>
                    : null 
                }
            </div>
        );
    }

}

export default compose(
    graphql(ORDERCOL_MODIFIER_FILTER_QUERY, {
        props: ({data: { orderColumnModifierFilter }}) => {
            return ({
                modifierFilterActive: orderColumnModifierFilter
            })
        }
    }),
)(OrderColItem);