import React from 'react';
import PropTypes from 'prop-types';
import shortid from 'shortid';

import OrderColModifier from '../../OrderColModifier/OrderColModifier';

class OrderColModList extends React.Component{  
    static propTypes = {
        modifiers: PropTypes.array
    }

    render(){
        const { modifiers } = this.props;
        const modList = modifiers === null ? null : modifiers.map(mod => {
            return (
                <OrderColModifier key={shortid.generate()} modifier={mod}/>                
            );
        });

        return (
            <div key={shortid.generate()} className='custom-order-column-modifier-list'>
                {modList}
            </div>
        );

    }
}

export default OrderColModList;
