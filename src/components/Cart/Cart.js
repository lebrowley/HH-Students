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

    //createOrder
    //     axios.post('/api/orders, {user_id- from authReducer; item_id, quantity, total, in_cart, saved_order, completed_order- from cartReducer, addedItems}) is there someway to send the entire addedItems array as it at this point in time? (that is at the point where the user has 1. added items to the cart, 2. chosen whether or not to save the order, and 3. paid for the order; since all of these actions have occurred, everything in the addedItems array should be up to date and what we want stored in the db. How can I transplant the entire array into my DB for storage and retrieval later for display of orders and unique cart instance?
    
    //could i "zip" all of the item_ids into one value to store in the order_info table (under item_id or equiv column)? 
    //so when an order is sent to the db the ids or "zipped" up into one integer or a string of integers separated by ,
    //and then when an order is access later, the ids are "unzipped" into their individual integers so I can get the individual items and all of their info again -- this would all have to happen on the backend so the front end gets and gives the info it can

    //or can i find a way to repeat the order_id across all of the items in the order when they're added to the table; do multiple inserts for each item while maintaining a consistent order_id for all of them (similar to how the menu_items table is set up)

    //     .then
    //     clear the cart information from display, reduxState (reset addedItems to be ready again for a new round of items added to the cart)
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