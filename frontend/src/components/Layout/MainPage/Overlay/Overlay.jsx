import React from 'react';
import PropTypes from 'prop-types';
import { graphql, compose } from 'react-apollo';

import { TOGGLE_OVERLAY, SET_OVERLAY_CONTENT, OVERLAY_QUERY } from '../../../../queries/state';
import './Overlay.css';

class Overlay extends React.Component{
    static propTypes = {
        content: PropTypes.object,
        isVisible: PropTypes.bool,
        toggleOverlay: PropTypes.func,
    }

    handleClick(){
        this.props.setOverlayContent(null);
        this.props.toggleOverlay();
    }

    render(){
        return(
            !this.props.isVisible ?
            null:
            <div className='custom-overlay'>
                <button type='button' className='btn close' onClick={() => this.handleClick()} aria-label="Close">
                    <i className="fa fa-window-close"></i> Schließen
                </button>
                {this.props.content}
            </div>
        );
    }
}

export default compose(
    graphql(OVERLAY_QUERY, {
        props: ({ data }) =>{ 
            return ({            
                content: data.Overlay.content
            })
        }         
    }),
    graphql(TOGGLE_OVERLAY, {
        props: ({ mutate }) => ({
            toggleOverlay: () => 
                mutate({})            
        })   
    }),
    graphql(SET_OVERLAY_CONTENT, {
        props: ({ mutate }) => ({
            setOverlayContent: (content) => 
                mutate({
                    variables: { content }
                })            
        })
    })
)(Overlay);