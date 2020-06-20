import React from 'react';
import {Switch, Route} from 'react-router-dom';
import Auth from './components/Auth';
import Dash from './components/Dash';
import Menu from './components/Menu';
// import Pay from './components/Pay';
import Orders from './components/myOrders/Orders';

export default (
    <Switch>
        <Route component={Auth} exact path='/'/>
        <Route component={Dash} path='/dashboard'/>
        <Route component={Menu} path='/menu/:id'/>
        {/* <Route component={Pay} path='/pay'/> */}
        <Route component={Orders} path='/myorders'/>
    </Switch>
)