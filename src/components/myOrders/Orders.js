import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getUser } from '../../redux/authReducer';
import { getOrders, getSaved } from '../../redux/cartReducer';
import { Link } from 'react-router-dom';
import SavedOrders from './Saved';

class Orders extends Component {

    render() {

        const orderTotal = this.props.cart.savedOrders.map(order => {
            return order[0].total
        })
        

        return (
            <div className='orders-component'>

                <h1>My Orders</h1>

                <div className='content'>
                    <div className='container'>
                        <h3>Saved Orders</h3>
                        
                        <div> {this.props.cart.savedOrders.map((order, index) => (
                            <SavedOrders
                                key={order.id}
                                order={order}
                                total={orderTotal[index]}
                            />
                        ))}
                        </div> 
                        
                    </div>
                    <Link to='/history'><button>History</button></Link>

                </div>

            </div>
        )
    }
}

const mapStateToProps = reduxState => reduxState

export default connect(mapStateToProps, { getUser, getOrders, getSaved })(Orders);
