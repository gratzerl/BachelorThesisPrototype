//type defintion of Table

const Table = `
    type Table {
        tableId: String
        employeeName: String
        tableName: String
        createdAt: Int
        acceptedAt: Int
        finishedAt: Int
        courses: [Course]
    }
`;

export default Table;