import React from 'react';
import routes from './routes';
import { connect } from 'react-redux';
import { getUser } from './redux/authReducer';
import {getMenuItems} from './redux/cartReducer';
import Nav from './components/Nav';
import Cart from './components/Cart/Cart';
import './styles/App.scss';

function App(props) {
  //hook for componentDidMount(getUser)
  // useEffect(() => {
  //   getUser()
  //   // getMenuItems()
  // }, [])

  return (
    <div className="App">
      {props.auth.isLoggedIn ? <Nav /> : null}
      {props.cart.cartOpen && props.auth.isLoggedIn ? <Cart /> : null}
      {routes}


    </div>
  );
}

const mapStateToProps = reduxState => reduxState
export default connect(mapStateToProps, { getUser, getMenuItems })(App);






// class App extends Component {
//   constructor(props) {
//     super(props)
//   }

//   // componentDidMount() {           //if getUser is invoked in this life cycle method, there is an error with the get request
//   //   this.props.getUser()
//   // }

//   // componentDidUpdate() { //if getUser is invoked in this life cycle method, getUser is continuously pending/fulfilled/pending/fulfilled
//   //   this.props.getUser()    //until the refresh and then it terminates and does not keep the user logged in
//   // }

//   render() {
//     return (
//       <div className="App">
//         {this.props.auth.isLoggedIn ? <Nav /> : null}
//         {this.props.cart.cartOpen && this.props.auth.isLoggedIn ? <Cart /> : null}
//         {routes}
//       </div>
//     )
//   }
// }



