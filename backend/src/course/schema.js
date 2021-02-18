const Course =`
    type Course {
        clientId: Int!
        tableId: String
        finishedAt: Int
        courseNumber: Int!
        orders: [Order]
    }
`;

export default Course;