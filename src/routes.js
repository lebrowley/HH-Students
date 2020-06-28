import React from 'react';
import {Switch, Route} from 'react-router-dom';
import Auth from './components/Auth';
import Dash from './components/Dash/Dash';
import Menu from './components/Menu/Menu';
import Profile from './components/Profile/Profile';
import Orders from './components/myOrders/Orders';

export default (
    <Switch>
        <Route component={Auth} exact path='/'/>
        <Route component={Dash} path='/dashboard'/>
        <Route component={Menu} path='/menu/:menuId'/>
        <Route component={Profile} path='/profile'/>
        <Route component={Orders} path='/myorders'/>
    </Switch>
)