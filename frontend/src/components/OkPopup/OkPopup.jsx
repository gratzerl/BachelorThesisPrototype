import React from 'react';
import Proptypes from 'prop-types';

import '../Layout/MainPage/Popup/Popup.css';


/*
    Popup content for the popup component (Layout)
    Shows Info and an ok button 
*/
class OkPopup extends React.Component{
    static propTypes = {
        content: Proptypes.string.isRequired,
        closeFunc: Proptypes.func.isRequired,
    }

    render(){
        return(
            <div className='card container-fluid custom-popup-content'>
                <div className='card-body'>
                    {this.props.content}
                </div>   
                <div className='card-footer row justify-content-end'>
                    <button onClick={() =>  this.props.closeFunc() } className='btn btn-primary col-2 mr-1 custom-popup-button'>Ok</button>
                </div>                 
            </div>
        );
    }
}

export default OkPopup;