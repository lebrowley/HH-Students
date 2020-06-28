import React, { Component } from 'react';
import axios from 'axios';
import StripeCheckout from 'react-stripe-checkout';
import { connect } from 'react-redux';
import { closeCart } from '../../redux/cartActions';
import { completeOrder, saveOrder, clearAdded } from '../../redux/orderActions';
import check from '../../check_mark.png';

import CartItems from './CartItems';

class Cart extends Component {
    constructor(props) {
        super(props)

        this.state = {
            checkoutOpen: false,
            markSave: false,
            markComplete: false
        }

        this.closeCart = this.closeCart.bind(this)
        this.handleComplete = this.handleComplete.bind(this)
        this.createOrder = this.createOrder.bind(this)
        this.handleSave = this.handleSave.bind(this)
    }

    closeCart() {
        this.props.closeCart()
    }

    async handleSave() {
        const save = await this.props.saveOrder()
        this.setState({ markSave: true })
    }

    async handleComplete() {
        const complete = await this.props.completeOrder()
        this.createOrder()
        this.setState({markComplete: true})
    }

    createOrder() {
        this.setState({ checkoutOpen: true })
        const user_id = this.props.auth.user.userId
        const { addedItems, total, saved_order, completed_order } = this.props.cart

        axios.post('/api/orders', { user_id, addedItems, total, saved_order, completed_order })
            .then(res => console.log('order created'))
            .catch(err => alert(err))
    }


    handleClick = () => {
        // console.log('button clicked!')
        // clear the cart information from display, reduxState
        this.props.clearAdded()
        this.setState({ checkoutOpen: false, markSave: false, markComplete: false })
    }

    handleToken(token, address, amount) {
        console.log(token, address, amount)
        axios.post('/checkout', { token, address, amount })
            .then(res => {
                if (res.data.status === 'success') {
                    // this.handleComplete()
                    // this.createOrder()

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

                    <div className='mark-container'>
                        <button id='save-order' onClick={() => this.handleSave()}>save order</button>
                        {this.state.markSave ? <img id='check-mark' alt='check-mark' src={check} /> : null}
                    </div>

                    <div className='total-display'>total: ${this.props.cart.total}</div>

                    <div className='mark-container'>
                        <button id='create-order' onClick={() => this.handleComplete()}>send order</button>
                        {this.state.markComplete ? <img id='check-mark' alt='check-mark' src={check} />: null}
                    </div>

                    {this.state.checkoutOpen ?
                        <button id='stripe-btn' onClick={this.handleClick}>
                            <StripeCheckout
                                stripeKey='pk_test_51Gvnb2LTyxBsnTeES4eGHhGVkesdPKPfGIZsl9XIjYI2itAHZLv9QTaXLWCvxQJ0H2afElbzS3iKUI9E2JVf1TPB00GBMPu7ZR'
                                token={this.handleToken}
                                billingAddress={true}
                                amount={this.props.cart.total * 100} //to convert to cents
                            />
                        </button>
                        : null}


                </div>

            </div>
        )
    }
}

const mapStateToProps = reduxState => reduxState
const mapDispatchToProps = { closeCart, completeOrder, saveOrder, clearAdded }
export default connect(mapStateToProps, mapDispatchToProps)(Cart);