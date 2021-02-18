
import React from 'react';

import  MainPage from '../Layout/MainPage/MainPage';
import AllTablesList from '../AllTablesList/AllTablesList';
import OrderColumn from '../OrderColumn/OrderColumn';

import './completeView.css';

/*
    Component which renders both the tables and the order column
    wrapped in MainPage -> CompleteView will be rendered inside the mainpage component
*/
class CompleteView extends React.Component{
    render(){
        return(
            <MainPage>
                <div className='custom-complete-view'>
                    <OrderColumn/>
                    <AllTablesList/>
                </div>
            </MainPage>);
    }
}

export default CompleteView;

{/* <div className='row'>                            
    <div className='col-lg-11'>
        <AllTablesList/>
    </div>
    <div className='col-lg-1'>
        <OrderColumn/>
    </div>
</div> */}