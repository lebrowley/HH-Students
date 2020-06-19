import React from 'react';
import {Switch, Route} from 'react-router-dom';
import Auth from './components/Auth';
import Dash from './components/Dash';

export default (
    <Switch>
        <Route component={Auth} exact path='/'/>
        <Route component={Dash} path='/dashboard'/>
    </Switch>
)