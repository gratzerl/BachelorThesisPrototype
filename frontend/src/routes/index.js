import React from 'react';

import { Switch, Route } from 'react-router-dom';

import HelloWorld from '../components/HelloWorld/HelloWorld';
import AllTablesList from '../components/AllTablesList/AllTablesList';
import OrderColumn from '../components/OrderColumn/OrderColumn';
import CompleteView from '../components/CompleteView/CompleteView';

//routes
const routes = (
    <Switch>
        <Route exact path="/" component={CompleteView}/>
        <Route path="/hello" component={HelloWorld}/>
        <Route path="/tables" component={AllTablesList}/>
        <Route path="/column" component={OrderColumn}/>
    </Switch>   
);

export default routes;