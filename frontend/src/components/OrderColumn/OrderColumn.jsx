import React from "react";
import PropTypes from "prop-types";
import shortid from "shortid";
import { graphql, compose } from "react-apollo"
import { Query } from "react-apollo";

import "./orderColumn.css";

import OrderColList from "../Layout/Partials/OrderColList";
import { ORDERCOLUMN_QUERY } from "../../queries/queries";
import { TOGGLE_ORDERCOL_MODIFIER_FILTER, ORDERCOL_MODIFIER_FILTER_QUERY } from "../../queries/state";

/*
    Component for rendering the "Summenspalte"
*/

class OrderColumn extends React.Component {
    static propTypes = {
        toggleModifierFilter: PropTypes.func,
        modifierFilterActive: PropTypes.bool,
    }

    render(){
        const isActive = this.props.modifierFilterActive;
        return(
            <div key={shortid.generate()} className="custom-order-column">
                <div className={"btn custom-order-column-btn btn-sm " + ( isActive ? "custom-filter-active-btn" : "custom-filter-inActive-btn")} onClick={() => this.props.toggleModifierFilter()}>
                    Änderer { isActive ? "ausblenden" : "anzeigen"}<i className="fa fa-filter ml-2"></i>
                </div>
                <Query query={ORDERCOLUMN_QUERY}>
                    {({ loading, error, data }) => {
                        if (loading) return <div>Fetching</div>;
                        if (error) {
                            console.log(error);
                            return <div>Error</div>;
                        }
                    
                        const orders = data.orderColOrders;
                        return (
                            <OrderColList orders={orders}/>
                        );
                    }}
                </Query>
            </div>
        );
    }
}

export default compose(
    graphql(TOGGLE_ORDERCOL_MODIFIER_FILTER, {
        props: ({ mutate }) => ({
            toggleModifierFilter: () =>
                mutate({})
        })
    }),
    graphql(ORDERCOL_MODIFIER_FILTER_QUERY, {
        props: ({data: { orderColumnModifierFilter }}) => {
            return ({
                modifierFilterActive: orderColumnModifierFilter
            })
        }
    }),
)(OrderColumn);