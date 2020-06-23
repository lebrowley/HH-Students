import React, { Component } from 'react';
import { connect } from 'react-redux';
import {closeCart} from '../redux/cartReducer';
// import { Link } from 'react-router-dom';
// import {withRouter} from 'react-router-dom';

class Cart extends Component {
    constructor(props) {
        super(props)

        this.state = {
            instructions: '',
            quantity: 1,
            total: 0
        }
        this.closeCart = this.closeCart.bind(this)
    }

    closeCart() {
        this.props.closeCart()
    }

    render() {
        const {addedItems} = this.props
        return (
            <div className="sidenav-right">
                <div className='sidenav-right-header'>
                <h3>My Cart</h3>
                <button onClick={() => this.closeCart()}>X</button>
                </div>
               
                <div className='cart-contents'>
                    <div className='cart-item-bubble'>{addedItems}</div>
                    <span>counter and trash</span>
                    <p>special instructions</p>
                    <input />
                    <button>save order</button>
                    <div className='total-display'>total</div>
                    <button>checkout</button>
                </div>

            </div>
        )
    }
}

const mapStateToProps = reduxState => reduxState
export default connect(mapStateToProps, {closeCart})(Cart);