import React, {useEffect} from 'react';
import routes from './routes';
import { connect } from 'react-redux';
import { getUser } from './redux/authReducer';
import {getMenuItems, getOrders, getSaved} from './redux/cartReducer';
import Nav from './components/Nav';
import Cart from './components/Cart/Cart';
import './styles/App.scss';

function App(props) {
  
  useEffect(() => {
    props.getUser()
  }, [])

  console.log(props)

  return (
    
    <div className="App">
      {props.auth.isLoggedIn ? <Nav /> : null}
      {props.cart.cartOpen && props.auth.isLoggedIn ? <Cart /> : null}
      {routes}
    </div>
  );
}

const mapStateToProps = reduxState => reduxState
export default connect(mapStateToProps, { getUser, getMenuItems, getOrders, getSaved })(App);






