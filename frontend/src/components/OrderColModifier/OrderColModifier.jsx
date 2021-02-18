import React from 'react';
import PropTypes from 'prop-types';

class OrderColModifier extends React.Component {
    static propTypes = {
        modifier: PropTypes.shape({
            amount: PropTypes.number,
            modifierTexts: PropTypes.array
        }),
    }

    render(){
        const { modifier } = this.props;
        const texts = modifier.modifierTexts.join(', ');
        return(
            <div className='custom-order-column-modifier-item'>
                {modifier.amount} x {' '}
                {texts}
            </div>
        );
    }

}

export default OrderColModifier;