import React from 'react';
import PropTypes from 'prop-types';
import shortid from 'shortid';
import FinishedItem from '../../FinishedItem/FinishedItem';

import './finishedItemList.css';

class FinishedItemList extends React.Component{  
    static propTypes = {
        orders: PropTypes.array
    }

    render(){
        const { orders } = this.props;
        if(orders.length === 0)
            return (<h3>Keine Abrufungen in den letzten 6 Stunden</h3>);
        const orderList = orders.map(order => {
            return (
                <FinishedItem key={shortid.generate()} order={order} className="col-md-auto"/>                
            );
        });

        return (
            <div key={shortid.generate()} className='custom-finished-item-list'>
                <table className='table table-striped table-responsive custom-table'>
                    <thead>
                        <tr>
                            <th scope="col" className='custom-table-row'>Tisch <i className="fa fa-undo ml-2"></i></th>
                            <th scope="col" className='custom-table-row'>Gang  <i className="fa fa-undo ml-2"></i></th>
                            <th scope="col" className='custom-table-row'>Menge</th>
                            <th scope="col" className='custom-table-row'>Artikel  <i className="fa fa-undo ml-2"></i></th>
                            <th scope="col" className='custom-table-row'>Änderer</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orderList}
                    </tbody>
                </table>
            </div>
        );

    }
}

export default FinishedItemList;
