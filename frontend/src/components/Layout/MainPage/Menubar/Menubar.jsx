import React from "react";
import Proptypes from "prop-types";
import { graphql, compose } from "react-apollo";

import { TOGGLE_ARTICLE_FILTER, ARTICLE_FILTER_QUERY, TOGGLE_OVERLAY, SET_OVERLAY_CONTENT } from "../../../../queries/state";
import AllFinishedItemsList from "../../../AllFinishedItemsList/AllFinishedItemsList";
import Settings from "../../../Settings/Settings";

import "./Menubar.css";


export class Menubar extends React.Component {
    static propTypes = {
        toggleArticleFinishedFilter: Proptypes.func,
        filterActive: Proptypes.bool,
        toggleOverlay: Proptypes.func,
        setOverlayContent: Proptypes.func,
    }

    finishedListOnClick(){
        this.props.setOverlayContent(<AllFinishedItemsList/>);
        this.props.toggleOverlay();
    }

    settingsOnClick(){
        this.props.setOverlayContent(<Settings/>);
        this.props.toggleOverlay();
    }

    render(){
        const isActive = this.props.filterActive;
        return(
            <nav className="navbar custom-navbar">
                <div>Küchendisplay</div>
                <div className="nav justify-content-end">
                    <button className={"btn btn-sm mr-2 " + ( isActive ? "custom-filter-active-btn" : "custom-filter-inActive-btn")} onClick={() => this.props.toggleArticleFinishedFilter()}>
                        Abgerufene Artikel { isActive ? "ausblenden" : "anzeigen" } <i className="fa fa-filter"></i>
                    </button>
                    <button className="btn btn-sm mr-2 custom-info-btn" onClick={() => this.finishedListOnClick()}>
                        Letzte Abrufungen <i className="fa fa-info-circle"></i>
                    </button>
                    <button className="btn btn-sm btn-outline-dark custom-settings-btn" onClick={() => this.settingsOnClick()}>
                        <i className="fas fa-cog"></i>
                    </button>
                </div>
            </nav>
        );
    }
}

export default compose(
    graphql(TOGGLE_ARTICLE_FILTER, {
        props: ({ mutate }) => ({
            toggleArticleFinishedFilter: () => 
                mutate({})            
        })   
    }),
    graphql(ARTICLE_FILTER_QUERY, {
        props: ({ data: { articleFinishedFilter }}) => {
            return ({            
                filterActive: articleFinishedFilter
            })}
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
)(Menubar);