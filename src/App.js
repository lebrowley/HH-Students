import React from 'react';
import routes from './routes';
import { connect } from 'react-redux';
import Nav from './components/Nav';
import Cart from './components/Cart';
import './App.css';

function App(props) {
  //hook for componentDidMount(getUser)
  return (
    <div className="App">
      {props.auth.isLoggedIn ? <Nav/> : null}
      {props.cart.cartOpen && props.auth.isLoggedIn ? <Cart /> : null}
      {routes}

      
    </div>
  );
}

const mapStateToProps = reduxState => reduxState
export default connect(mapStateToProps)(App);
