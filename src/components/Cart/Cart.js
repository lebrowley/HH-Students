import React, { Component } from 'react';
import axios from 'axios';
import StripeCheckout from 'react-stripe-checkout';
import { connect } from 'react-redux';
import { closeCart } from '../../redux/cartActions';
// import { saveOrder } from '../../redux/orderActions';
// import cartReducer from '../../redux/cartReducer';
import CartItems from './CartItems';

class Cart extends Component {
    constructor(props) {
        super(props)

        this.state = {
            instructions: ''
        }

        this.closeCart = this.closeCart.bind(this)
        // this.handleComplete = this.handleComplete.bind(this)
    }

    closeCart() {
        this.props.closeCart()
    }

    // handleSave() {
    //     saveOrder() from orderActions/cartReducer
    //     this action will toggle saved_order to true
    // }

    // handleComplete() {
    //     some sort of loading animation while all the .thens chained below complete? 

    //     completeOrder() from orderActions/cartReducer; toggle completed_order to true and in_cart to false

    //     axios.post('/api/orders, {user_id- from authReducer; item_id, quantity, total, in_cart, saved_order, completed_order- from cartReducer, addedItems})

    //     .then
    //     clear the cart information from display, reduxState and DB
    //     clearAdded() from orderActions/cartReducer
    // }

    handleToken(token, address, amount) {
        console.log(token, address, amount)
        axios.post('/checkout', { token, address, amount })
            .then(res => {
                if (res.data.status === 'success') {
                    //this.handleComplete()

                    //toast notification react-toastify package
                    alert('successful payment')

                } else { alert('Something went wrong in processing your payment. Please try again later.') }
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
            {/*conditional render some sort of loading component with CartItems after payment while completeOrder is running?? */}
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

                    {/* <p>Special Instructions</p>
                    <input /> */}
                    <button id='save-order'>save order</button>
                    <div className='total-display'>total: ${this.props.cart.total}</div>

                    <StripeCheckout
                        stripeKey='pk_test_51Gvnb2LTyxBsnTeES4eGHhGVkesdPKPfGIZsl9XIjYI2itAHZLv9QTaXLWCvxQJ0H2afElbzS3iKUI9E2JVf1TPB00GBMPu7ZR'
                        token={this.handleToken}
                        billingAddress={true}
                        amount={this.props.cart.total * 100} //to convert to cents
                    />
                </div>

            </div>
        )
    }
}

const mapStateToProps = reduxState => reduxState
export default connect(mapStateToProps, { closeCart })(Cart);