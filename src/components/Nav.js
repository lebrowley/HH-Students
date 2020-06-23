import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { logoutUser } from '../redux/authReducer';
import { openCart } from '../redux/cartReducer';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import cart from '../cart_icon.png';

function Nav(props) {
    const logout = () => {
        axios.delete('/auth/logout')
            .then(() => {
                props.logoutUser()
                props.history.push('/')
            })
            .catch(err => console.log(err))
    }

    const openCart = () => {
        props.openCart()
    }
    return (
        <div className="sidenav">
            <h3>Hungry Hungry Students</h3>

            <div className='nav-links'>
                <Link to='/dashboard'><p>Food Trucks</p></Link>
                <Link to='/myorders'><p>My Orders</p></Link>

                <div className='cart-icon-container'>
                    <img className='cart-icon' src={cart} onClick={() => openCart()} />
                </div>

                <button onClick={() => logout()}>Logout</button>

            </div>

        </div>
    );
}

const mapStateToProps = reduxState => reduxState
const mapDispatchToProps = { logoutUser, openCart }
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Nav));