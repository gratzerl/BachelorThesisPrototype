//schema for orders in the "summenspalte"

const OrderColItem = `
    type OrderColItem {
        articleName: String
        articleId: String
        amount: Int
        modifiers: [OrderColModifier]
    }
`;

export default OrderColItem;