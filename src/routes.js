import React from 'react';
import {Switch, Route} from 'react-router-dom';
import Auth from './components/Auth';
import About from './components/About';
import Dash from './components/Dash/Dash';
import Menu from './components/Menu/Menu';
import Profile from './components/Profile';
import Orders from './components/myOrders/Orders';
import History from './components/myOrders/History';
import Saved from './components/myOrders/Orders';

export default (
    <Switch>
        <Route component={Auth} exact path='/'/>
        <Route component={About} exact path='/about'/>
        <Route component={Dash} path='/dashboard'/>
        <Route component={Menu} path='/menu/:menuId'/>
        <Route component={Profile} path='/profile'/>
        <Route component={Orders} path='/myorders'/>
        <Route component={History} path='/history'/>
        <Route component={Saved} path='/saved'/>
    </Switch>
)