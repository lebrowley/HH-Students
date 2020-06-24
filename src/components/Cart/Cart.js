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
            instructions: '',
            total: 0
        }
        this.closeCart = this.closeCart.bind(this)
        // this.handleToken = this.handleToken.bind(this)
    }

    closeCart() {
        this.props.closeCart()
    }

    //handleChange from input- setState instructions: input


    calculateTotal() {
        //make an array of all of the prices of items in this.props.cart.addedItems 
            //let prices = []   
            //iterate over addItems array and pull out the prices; push to prices
            //let sumPrices = [array of prices].reduce(a, b) => a + b, 0 >> should return an integer
        //make an array of all of the quantities in this.props.cart.addedItems
            //let quantities = []
            //iterate over addedItems array and pull out quantities; push to quantities
            //let sumQuant = [array of quantities].reduce(a, b) => a + b, 0 >>should return an integer
        //multiply prices and quantities
            //let calculation = sumPrices * sumQuant
        //setState({total: calculation})
        //fired when the component mounts? or when the component updates?
        //the component mounts when something is added to the cart, so addedItems won't be empty
        //but potentially all the items could then be removed from the cart making addedItems empty
        //conditionally render the total display so that if total on state is falsey, it displays default
        //and if total is truthy, it displays the correct total as calculated by this function
    }

    //createOrder- user_id, item_id, quantity, special instructions
    //send these in post request to create order_info table in db
    //is this fired when save order button is clicked? or when checkout button is clicked? 

    handleToken(token, address) {
        // console.log(token, address)
        axios.post('/checkout', {token})
        .then(res => {
            if(res.data.status === 'success') {
                //toast notification react-toastify package
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

                    <p>special instructions</p>
                    <input />
                    <button>save order</button>
                    <div className='total-display'>total: {this.state.total}</div>
                    
                    <StripeCheckout
                        stripeKey='pk_test_51Gvnb2LTyxBsnTeES4eGHhGVkesdPKPfGIZsl9XIjYI2itAHZLv9QTaXLWCvxQJ0H2afElbzS3iKUI9E2JVf1TPB00GBMPu7ZR'
                        token={this.handleToken}
                        billingAddress={true}
                        // amount={this.state.total * 100} //to convert to cents
                        // name={} name of product
                        />
                </div>

            </div>
        )
    }
}

const mapStateToProps = reduxState => reduxState
export default connect(mapStateToProps, { closeCart })(Cart);