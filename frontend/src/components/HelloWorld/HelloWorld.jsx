import React from 'react';

import { Query } from 'react-apollo';
import gql from 'graphql-tag';

//import { withApollo } from 'react-apollo';

const TABLE_QUERY = gql`
{
    tables{
        tableId,
        employeeName,
        createdAt
    }
  }
`;

class HelloWorld extends React.Component {
    render(){
        return(
            <div>
                <h1>HELLO WORLD</h1>
                <Query query={TABLE_QUERY}>
                    {({ loading, error, data }) => {
                        if (loading) return <div>Fetching</div>
                        if (error) {
                            console.log(error);
                            return <div>Error</div>
                        }
                    
                        const tablesToRender = data.tables;
                    
                        return (
                            <div>
                                {tablesToRender.map(table => { return (
                                        <div key={table.tableId}>
                                            <ul>
                                                <li>Tischnummer: {table.tableId}</li>
                                                <li>Kellner: {table.employeeName}</li>
                                                <li>Eröffnet um: {table.createdAt}</li>
                                            </ul>
                                        </div>
                                    )}
                                )}
                            </div>
                        )
                    }}
                </Query>
            </div>
        );
    }
}

export default HelloWorld;