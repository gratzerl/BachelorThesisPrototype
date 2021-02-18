//type definiton of Order

const Order = `
    type Order {
        tableId: String
        tableName: String
        articleName: String
        articleId: String
        amount: Int
        courseNumber: Int
        acceptedAt: Int
        finishedAt: Int
        cancelledAt: Int
        createdAt: Int
        modifiers: Modifier
    }
`;

export default Order;