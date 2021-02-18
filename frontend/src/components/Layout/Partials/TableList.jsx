import React from 'react';
import PropTypes from 'prop-types';
import shortid from 'shortid';

import TableItem from '../../TableItem/TableItem';

import './tableList.css';



class TableList extends React.Component{  
    static propTypes = {
        tables: PropTypes.array
    }

    render(){
        const { tables } = this.props;
        let tableList = tables.map(table => {
            return (
                <TableItem key={shortid.generate()} table={table} className="col-sm col-md col-lg"/>                
            );
        });
        
        //tableList.splice(i, 0, <div key={shortid.generate()} className='w-100 d-none d-md-block'/>);

        return (
            <div key={shortid.generate()} className="row custom-table-list">
                {tableList}
            </div>
        );

    }
}

export default TableList;
