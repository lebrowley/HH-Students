import React, { Component } from 'react';
// import axios from 'axios';
import { connect } from 'react-redux';
import { getUser } from '../../redux/authReducer';
import OrderHist from './OrderHist';
import SavedOrders from './Saved';

class Orders extends Component {
    constructor() {
        super()

        this.state = {
            currentOrder: [],
            savedOrder: []
        }

    }

    componentDidMount() {
        this.props.getUser()
    }

    render() {
        const savedOrders = this.props.cart.orders.filter(order => {
            if (order.saved_order) {
                return order
            }
        })
        return (
            <div className='orders-component'>

                <h1>My Orders</h1>

                <div className='content'>
                    <div className='order-box'>
                        <p>saved orders</p>
                        {savedOrders ? <div>{savedOrders.map(order => (
                            <SavedOrders
                                key={order.id}
                                order_id={order.order_id}
                                item_id={order.item_id}
                                item_name={order.item_name}
                                item_price={order.item_price}
                                item_description={order.item_description}
                            />
                        ))}</div> : <p>You have no saved orders.</p>}
                    </div>

                    <div className='order-box'>
                        <p>past orders</p>
                        {this.props.cart.orders.map(order => (
                            <OrderHist
                                key={order.id}
                                order_id={order.order_id}
                                item_id={order.item_id}
                                item_name={order.item_name}
                                item_price={order.item_price}
                                item_description={order.item_description}
                            />
                        ))}
                    </div>

                </div>

            </div>
        )
    }
}

const mapStateToProps = reduxState => reduxState

export default connect(mapStateToProps, { getUser })(Orders);
