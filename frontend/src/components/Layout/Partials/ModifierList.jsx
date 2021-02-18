import React from 'react';
import PropTypes from 'prop-types';
import shortid from 'shortid';

import ModifierItem from '../../ModifierItem/ModifierItem';

class ModifierList extends React.Component{  
    static propTypes = {
        modifier: PropTypes.object,
    }

    render(){
        const { modifier } = this.props;
        

        return (
            <div key={shortid.generate()}>
                <ModifierItem key={shortid.generate()} modifier={modifier}/>
            </div>
        );

    }
}

export default ModifierList;