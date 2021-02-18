import React from 'react';
import PropTypes from 'prop-types';


import { timeDifference } from '../../../util/time';
import '../../../tableItem.css';


class TableHeader extends React.Component {
    static propTypes = {
        table: PropTypes.shape({
            tableId: PropTypes.string,
            tableName: PropTypes.string,
            employeeName: PropTypes.string,
            acceptedAt: PropTypes.number,
            createdAt: PropTypes.number,
            finishedAt: PropTypes.number
        }),
    }

    constructor(props){
        super(props);
        this.state = {
            timeDiff: 0
        }
        this.timerId = null;
    }

    componentDidMount(){
        this.updateTime();
        this.timerId = setInterval(
            () => this.updateTime(),
            2000
        );
    }

    componentWillUnmount(){
        clearInterval(this.timerId);
    }

    updateTime(){
        const { table } = this.props;
        this.setState({
            timeDiff: (table.acceptedAt === null ? timeDifference(null, table.createdAt) : timeDifference(null, table.acceptedAt))
        });
    }

    render(){
        const { table } = this.props;
        return(
            <div className={ "card-header custom-table-header" + (table.acceptedAt == null ? '' : ' custom-table-item-accepted')}>                                
                <span className='custom-table-number'>{ table.tableName }</span>
                <span className='custom-table-item-time'>
                    { this.state.timeDiff } Min<br/>
                    { table.employeeName }    
                </span>
            </div> 
        );
    }
}

export default TableHeader;