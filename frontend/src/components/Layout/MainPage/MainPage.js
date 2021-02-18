import React from 'react';
import PropTypes from 'prop-types';
import { graphql, compose } from 'react-apollo';

import Popup from './Popup/Popup';
import Menubar from './Menubar/Menubar';
import Overlay from './Overlay/Overlay';

import { POPUP_QUERY, OVERLAY_QUERY } from '../../../queries/state';

/*
    Defines what components should always be shown on every page(eg Navbar)
*/
class MainPage extends React.Component {
    static propTypes = {
        children: PropTypes.oneOfType([
            PropTypes.object,
            PropTypes.array
        ]),
        isPopupVisible: PropTypes.bool,
        isOverlayVisible: PropTypes.bool,
    }

    render(){
        const { children } = this.props;
        return(
            <React.Fragment>
                <Menubar/>
                <Popup isVisible={this.props.isPopupVisible}/>
                <Overlay isVisible={this.props.isOverlayVisible}/>
                <div>
                    {children}
                </div>
            </React.Fragment>
        );
    }
}

export default compose(
    graphql(POPUP_QUERY, {
        props: ({ data: { Popup } }) => {
            return ({            
                isPopupVisible: Popup.isVisible
            })}
    }),
    graphql(OVERLAY_QUERY, {
        props: ({ data: { Overlay } }) => {
            return ({            
                isOverlayVisible: Overlay.isVisible
            })}
    })
)(MainPage);