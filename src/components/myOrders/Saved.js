import React, { useState, useEffect } from 'react';
import axios from 'axios';
import StripeCheckout from 'react-stripe-checkout';
import { connect } from 'react-redux';
import { unSave } from '../../redux/orderActions';
import { addToCart } from '../../redux/cartActions';
import {getUser} from '../../redux/authReducer';
import SavedItems from './SavedItems';

function Saved(props) {
    //useState to set stripeOpen default false
    const [checkoutOpen, setCheckOutOpen] = useState(false)

    useEffect(() => {
        props.getUser()   //on refresh does not keep user logged in
    }, [])

    const nameArr = props.order.map(order => {
        return order.menu_name
    })

    const order_id = props.cart.orders.map(element => {
        return element[0].order_id
    })

    const handleToken = (token, address, amount) => {
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

    return (
        <div className='saved-component'>
            <div className='order-box'>
                {props.order.map((order, index) => (
                    <SavedItems
                        key={order.id}
                        item_name={order.item_name}
                        item_price={order.item_price}
                        item_description={order.item_description}
                        quantity={order.quantity}
                        menu_name={nameArr[index]}
                    />
                ))}
            </div>

            <div className='saved-order-btns'>
                <button onClick={() => props.unSave(order_id)}>Delete</button>
                <button onClick={() => setCheckOutOpen(true)}>Reorder</button>


                {checkoutOpen ?
                    <div id='stripe-btn-reorder' >  {/*onClick={this.handleClick}*/}
                        <StripeCheckout
                            stripeKey='pk_test_51Gvnb2LTyxBsnTeES4eGHhGVkesdPKPfGIZsl9XIjYI2itAHZLv9QTaXLWCvxQJ0H2afElbzS3iKUI9E2JVf1TPB00GBMPu7ZR'
                            token={handleToken}
                            billingAddress={true}
                            amount={props.total * 100} //to convert to cents
                        />
                        <div><p>total: ${props.total}</p></div>
                    </div>
                    : null}

            </div>

        </div>
    )
}

const mapStateToProps = reduxState => reduxState
export default connect(mapStateToProps, { getUser, addToCart, unSave })(Saved);
