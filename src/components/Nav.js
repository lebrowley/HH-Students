import React, { useEffect } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { logoutUser, getUser } from '../redux/authReducer';
import { getMenuItems } from '../redux/cartReducer'; //getOrders
import { clearCartState } from '../redux/cartReducer';
import { openCart } from '../redux/cartActions';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import cart from '../cart_icon.png';
import hippo from '../hippo.png';

function Nav(props) {
    useEffect(() => {
        props.getMenuItems()    //if getUser is invoked here, it works, but it doesn't keep user logged in on refresh
        //getOrders() 
    }, [])

    const logout = () => {
        axios.delete('/auth/logout')
            .then(() => {
                props.logoutUser()
                props.clearCartState()
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
                <Link id='link' to='/dashboard'><p>Food Trucks</p></Link>
                <Link id='link' to='/myorders'><p>My Orders</p></Link>

                <div className='cart-icon-container'>
                    <img className='cart-icon' alt='cart' src={cart} onClick={() => openCart()} />
                </div>
                <Link to={'/profile'}><img className='profile-icon' alt='profile' src={hippo}/></Link>

                <button id='logout-btn' onClick={() => logout()}>Logout</button>

            </div>

        </div>
    );
}

const mapStateToProps = reduxState => reduxState
const mapDispatchToProps = { logoutUser, openCart, getMenuItems, getUser, clearCartState } //getOrders
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Nav));