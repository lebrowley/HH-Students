import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getUser } from '../../redux/authReducer';
import { getOrders } from '../../redux/cartReducer'; 
import {Link} from 'react-router-dom';
import SavedOrders from './Saved';

class Orders extends Component {
    constructor() {
        super()

        this.state = {
            savedOrders: []
        }

    }

    componentDidMount() {
        this.props.getUser()
        this.props.getOrders(this.props.auth.user.userId)
        this.findSaved(this.props.cart.orders) 
    }

    findSaved(arr) {
        let saved = []
        arr.forEach(element => {
            if(element[0].saved_order) {
                saved.push(element)
            }
        
        })
    this.setState({savedOrders: saved})
    }

    render() {

        const orderTotal = this.props.cart.orders.map(order =>{
            return order[0].total
        })

        return (
            <div className='orders-component'>

                <h1>My Orders</h1>

                <div className='content'>
                    <div className='container'>
                        <h3>Saved Orders</h3>
                        {/* {savedOrders ?  : <p>You have no saved orders.</p>} */}
                        {this.state.savedOrders.map((order, index) => (
                            <SavedOrders
                                key={order.id}
                                order={order}
                                total={orderTotal[index]}
                            />
                        ))}
                    </div>

                   <Link to='/history'><button>View order history</button></Link>

                </div>

            </div>
        )
    }
}

const mapStateToProps = reduxState => reduxState

export default connect(mapStateToProps, { getUser, getOrders })(Orders);
