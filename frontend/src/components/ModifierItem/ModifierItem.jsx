import React from 'react';
import PropTypes from 'prop-types';
import shortid from 'shortid';

import './modifiers.css';


//Modifier for order
//Image not supported
class ModifierItem extends React.Component {
    static propTypes = {
        modifier: PropTypes.shape({
            amount: PropTypes.number,            
            modifierTexts: PropTypes.array,
            modifierImage: PropTypes.array
        }),
    }
    render(){
        const { modifier } = this.props;
        const texts = modifier.modifierTexts.join('\n');
        
        return(
            <div key={shortid.generate()} className='custom-modifier-item'>
                { texts }<br/>
            </div>
                 
        );
    }
}

export default ModifierItem;