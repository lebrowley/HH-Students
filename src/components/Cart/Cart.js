import React, { Component } from 'react';
import axios from 'axios';
import StripeCheckout from 'react-stripe-checkout';
import { connect } from 'react-redux';
import { closeCart } from '../../redux/cartActions';
// import { Link } from 'react-router-dom';
import CartItems from './CartItems';

class Cart extends Component {
    constructor(props) {
        super(props)

        this.state = {
            instructions: ''
        }
        this.closeCart = this.closeCart.bind(this)
    }

    closeCart() {
        this.props.closeCart()
    }

    //handleChange from input- setState instructions: input

    //createOrder- user_id, item_id, quantity, special instructions
    //send these in post request to create order_info table in db
    //is this fired when save order button is clicked? or when checkout button is clicked? 

    handleToken(token, address) {
        // console.log(token, address)
        axios.post('/checkout', {token})
        .then(res => {
            if(res.data.status === 'success') {
                //toast notification react-toastify package
                //clear the cart information from display, reduxState and DB
                alert('successful payment')
            } else{alert('something went wrong')}
        })
    }

    render() {
        return (
            <div className="sidenav-right">
                <div className='sidenav-right-header'>
                    <h3>My Cart</h3>
                    <button className='close-cart-btn' onClick={() => this.closeCart()}>X</button>
                </div>

                <div className='cart-contents'>

                    <div className="cart-items-container">
                        {this.props.cart.addedItems.map(item => (
                            <CartItems
                                key={item.item_id}     
                                itemId={item.item_id}
                                itemName={item.item_name}
                                itemPrice={item.item_price}
                                itemDesc={item.item_description} />
                        ))}
                    </div>

                    <p>Special Instructions</p>
                    <input />
                    <button>save order</button>
                    <div className='total-display'>total: ${this.props.cart.total}</div>
                    
                    <StripeCheckout
                        stripeKey='pk_test_51Gvnb2LTyxBsnTeES4eGHhGVkesdPKPfGIZsl9XIjYI2itAHZLv9QTaXLWCvxQJ0H2afElbzS3iKUI9E2JVf1TPB00GBMPu7ZR'
                        token={this.handleToken}
                        billingAddress={true}
                        amount={this.props.cart.total * 100} //to convert to cents
                        // name={} name of product
                        />
                </div>

            </div>
        )
    }
}

const mapStateToProps = reduxState => reduxState
export default connect(mapStateToProps, { closeCart })(Cart);