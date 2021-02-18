import React from 'react';
import Proptypes from 'prop-types';
import { graphql, compose } from 'react-apollo';

import { SETTINGS_QUERY, SETTINGS_SHOWPOPUP_MUTATION, TOGGLE_OVERLAY, SET_OVERLAY_CONTENT } from '../../queries/state';

import './settings.css';

/*
    Component to get local user settings
*/
class Settings extends React.Component{    
    static propTypes = {
        showPopup: Proptypes.bool,
        setShowPopupSetting: Proptypes.func,
        toggleOverlay: Proptypes.func,
        setOverlayContent: Proptypes.func,
    }

    storeSettings(){
        localStorage.setItem('showPopup', document.querySelector('#showPopup').checked);
        const show = document.querySelector('#showPopup').checked === true;
        this.props.setShowPopupSetting(show);
        this.hideSettings();
    }

    hideSettings(){
        this.props.setOverlayContent(null);
        this.props.toggleOverlay();
    }

    render(){
        const { showPopup } = this.props;
        const checked = showPopup ? 'checked' : '';
        return(
            <div className='custom-overlay-content'>
                <h1 className='custom-overlay-header'>Einstellungen</h1>
                <form onSubmit={() => null}>
                    <div className='form-check custom-overlay-form mb-4'>
                        <label className='form-check-label' htmlFor='showPopup'>
                            <input className='form-check-input settings-form' id='showPopup' type='checkbox' defaultChecked={checked} value={showPopup}/>
                            Popup vor Abrufungen anzeigen
                        </label>
                        <br/>
                    </div>
                    <button className='btn btn-primary mr-2' type='button' onClick={() => this.storeSettings()}>Speichern</button>
                    <button className='btn btn-secondary' type='button' onClick={() => this.hideSettings()}>Abbrechen</button>
                </form>
            </div>
        );
    }
}   

export default compose(
    graphql(SETTINGS_QUERY, {
        props: ({ data: { Settings }}) => {
            return ({            
                showPopup: Settings.showPopup
            })}
    }),
    graphql(SETTINGS_SHOWPOPUP_MUTATION, {
        props: ({ mutate }) => ({
            setShowPopupSetting: (show) => 
                mutate({
                    variables: { show }
                })            
        })
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
)(Settings);