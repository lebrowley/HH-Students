import React, { Component } from 'react';
import { connect } from 'react-redux';
import { closeCart } from '../../redux/cartActions';
import { Link } from 'react-router-dom';
// import {withRouter} from 'react-router-dom';
import CartItems from './CartItems';

class Cart extends Component {
    constructor(props) {
        super(props)

        this.state = {
            instructions: '',
            total: 0
        }
        this.closeCart = this.closeCart.bind(this)
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
                    <Link to='/pay'><button>checkout</button></Link>
                </div>

            </div>
        )
    }
}

const mapStateToProps = reduxState => reduxState
export default connect(mapStateToProps, { closeCart })(Cart);