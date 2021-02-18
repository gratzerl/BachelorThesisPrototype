//default cache state

export const defaultState = {
    Popup: {
        __typename: 'Popup',
        isVisible: false,
        content: null
    },
    articleFinishedFilter: false,
    orderColumnModifierFilter: false,
    Overlay: {
        __typename: 'Overlay',
        isVisible: false,
        content: null
    },
    Settings: {
        __typename: 'Settings',
        showPopup: localStorage.getItem('showPopup') === 'true' ? true : false
    }
}