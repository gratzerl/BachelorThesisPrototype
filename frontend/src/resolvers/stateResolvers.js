import { InMemoryCache } from 'apollo-cache-inmemory';
import { POPUP_QUERY, ARTICLE_FILTER_QUERY, OVERLAY_QUERY, SETTINGS_QUERY, ORDERCOL_MODIFIER_FILTER_QUERY } from '../queries/state';
import { withClientState } from 'apollo-link-state';
import { defaultState } from '../state/default';


export const cache = new InMemoryCache();

//resolver for cache mutations
export const stateLink = withClientState({
    cache: cache,
    resolvers: {
        Mutation: {
            togglePopup: (_, args, { cache }) => {          
                let data = cache.readQuery({
                    query: POPUP_QUERY
                });
                data.Popup.isVisible = !data.Popup.isVisible;
                cache.writeQuery({
                    query: POPUP_QUERY,
                    data: data
                });
                return data.Popup;
            },
            toggleOverlay: (_, args, { cache }) => {
                let data = cache.readQuery({
                    query: OVERLAY_QUERY
                });
                data.Overlay.isVisible = !data.Overlay.isVisible;
                cache.writeQuery({
                    query: OVERLAY_QUERY,
                    data: data
                });
                return data.Overlay;
            },
            setPopupContent: (_, { content }, { cache }) => {
                let data = cache.readQuery({
                    query: POPUP_QUERY
                });
                data.Popup.content = content;
                cache.writeQuery({
                    query: POPUP_QUERY,
                    data: data
                });
                return data.Popup;
            },
            setOverlayContent : (_, { content }, { cache }) => {
                let data = cache.readQuery({
                    query: OVERLAY_QUERY
                });
                data.Overlay.content = content;
                cache.writeQuery({
                    query: OVERLAY_QUERY,
                    data: data
                });
                return data.Overlay;
            },
            toggleArticleFinishedFilter: (_, args, { cache }) => {
                let data = cache.readQuery({
                    query: ARTICLE_FILTER_QUERY
                });
                data.articleFinishedFilter = !data.articleFinishedFilter;
                cache.writeQuery({
                    query: ARTICLE_FILTER_QUERY,
                    data: data
                });
                return data.articleFinishedFilter;
            },
            toggleOrderColumnModifierFilter: (_, args, { cache }) => {
                let data = cache.readQuery({
                    query: ORDERCOL_MODIFIER_FILTER_QUERY
                });
                data.orderColumnModifierFilter = !data.orderColumnModifierFilter;
                cache.writeQuery({
                    query: ORDERCOL_MODIFIER_FILTER_QUERY,
                    data: data
                });
                return data.orderColumnModifierFilter;
            },
            setShowPopupSetting: (_, args, { cache }) => {
                let data = cache.readQuery({
                    query: SETTINGS_QUERY
                });
                data.Settings.showPopup = args.show;
                cache.writeQuery({
                    query: SETTINGS_QUERY,
                    data: data
                });
                return data.Settings.showPopup;
            }
        }
    },
    defaults: defaultState,
    //typedefs of cache types
    typeDefs: `
        type Popup {
            isVisible: Boolean!
            content: String
        }

        type Overlay {
            isVisible: Boolean!
            content: String
        }

        type Query {
            popup: Popup
            overlay: Overlay
            articleFinishedFilter: Boolean
            orderColumnModifierFilter: Boolean
        }

        type Settings {
            showPopup: Boolean
        }

        type Mutation {
            togglePopup: Popup
            toggleOverlay: Overlay
            setPopupContent(content: String!): Popup
            setOverlayContent(content: String!): Overlay
            toggleArticleFinishedFilter: Boolean
            toggleOrderColumnModifierFilter: Boolean
            setShowPopupSetting(show: Boolean): Boolean
        }
    `
});
