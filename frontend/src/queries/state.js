import gql  from 'graphql-tag';

/*
    Queries and mutations for the cache state
*/

/*
    OrderColumn Modifier filter
*/
export const ORDERCOL_MODIFIER_FILTER_QUERY = gql`
    query orderColumnModifierFilter @client{
        orderColumnModifierFilter @client
    }
`;

export const TOGGLE_ORDERCOL_MODIFIER_FILTER = gql`
    mutation toggleOrderColumnModifierFilter @client {
        toggleOrderColumnModifierFilter @client
    }
`;

/*
    Article filter
*/

export const TOGGLE_ARTICLE_FILTER = gql`
    mutation toggleArticleFinishedFilter {
        toggleArticleFinishedFilter @client
    }
`;

export const ARTICLE_FILTER_QUERY = gql`
    query articleFinishedFilter @client{
        articleFinishedFilter @client
    }
`;

/*
    Popup
*/

export const POPUP_QUERY = gql`
    query popup @client {
        Popup @client {
            isVisible @client,
            content @client
        }
    }
`;

export const TOGGLE_POPUP = gql`
    mutation togglePopup {
        togglePopup @client
    }
`;

export const SET_POPUP_CONTENT = gql`
    mutation setPopupContent($content: String!) {
        setPopupContent(content: $content) @client    
    }
`;

/*
    Overlay
*/

export const OVERLAY_QUERY = gql`
    query overlay @client {
        Overlay @client {
            isVisible @client,
            content @client
        }
    }
`;

export const TOGGLE_OVERLAY = gql`
    mutation toggleOverlay {
        toggleOverlay @client
    }
`;

export const SET_OVERLAY_CONTENT = gql`
    mutation setOverlayContent($content: String!) {
        setOverlayContent(content: $content) @client    
    }
`;

/*
    Settings
*/

export const SETTINGS_QUERY = gql`
    query settings @client{
        Settings @client{
            showPopup @client
        }
    }
`;

export const SETTINGS_SHOWPOPUP_MUTATION = gql`
    mutation setShowPopupSetting($show: Boolean!) {
        setShowPopupSetting(show: $show) @client    
    }
`;