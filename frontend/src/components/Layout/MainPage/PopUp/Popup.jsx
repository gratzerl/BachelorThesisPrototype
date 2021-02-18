import React from 'react';
import PropTypes from 'prop-types';
import { graphql, compose } from 'react-apollo';

import { POPUP_QUERY } from '../../../../queries/state';

import './Popup.css';

class Popup extends React.Component {
    static propTypes = {
        content: PropTypes.object,
        isVisible: PropTypes.bool
    }

    render(){
        return(
            !this.props.isVisible ? 
            null :
            <div className='custom-popup'> 
                {this.props.content}
            </div>
        );
    }
}

export default compose(
    graphql(POPUP_QUERY, {
        props: ({ data }) =>{ 
            return ({            
                content: data.Popup.content
            })
        }         
    })
)(Popup);