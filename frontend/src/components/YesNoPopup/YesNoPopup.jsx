import React from 'react';
import Proptypes from 'prop-types';

import '../Layout/MainPage/Popup/Popup.css';

/*
    Popup content for the popup component (Layout)
    Shows Yes/No Question
*/
class YesNoPopup extends React.Component{
    static propTypes = {
        title: Proptypes.string,
        yesFunc: Proptypes.func.isRequired,
        content: Proptypes.string.isRequired,
        closeFunc: Proptypes.func.isRequired,
    }

    render(){
        return(
            <div className='card container-fluid custom-popup-content'>                
                <div className='card-body'>
                    {this.props.title !== undefined ?
                        <h5 className='card-title'>
                            {this.props.title}
                        </h5> 
                        : null
                    }
                    {this.props.content}
                </div>   
                <div className='card-footer row justify-content-end'>
                    <button onClick={() =>  this.props.closeFunc() } className='btn btn-secondary col-2 mr-1 custom-popup-button'>Nein</button>
                    <button onClick={() => { this.props.yesFunc(); this.props.closeFunc();} } className='btn btn-primary col-2 custom-popup-button'>Ja</button>
                </div>                 
            </div>
        );
    }
}

export default YesNoPopup;